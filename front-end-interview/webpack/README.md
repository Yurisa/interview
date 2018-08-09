## webpack
### webpack优化
#### 一、优化构建速度
- Webpack在启动后会根据Entry配置的入口出发，递归地解析所依赖的文件。这个过程分为搜索文件和把匹配的文件进行分析、转化的两个过程，因此可以从这两个角度来进行优化配置。

##### 1.1 缩小搜索范围
搜索过程优化方式包括:
- 1.resolve字段告诉webpack怎么去搜索文件，所以首先要重视resolve字段的配置：
- 2.module.noParse字段告诉Webpack不必解析哪些文件，可以用来排除对非模块化库文件的解析
- 3.配置loader时，通过test、exclude、include缩小搜索范围

##### 1.2 使用DllPlugin减少基础模块编译次数
DllPlugin动态链接库插件，其原理是把网页依赖的基础模块抽离出来打包到dll文件中，当需要导入的模块存在于某个dll中时，这个模块不再被打包，而是去dll中获取。**为什么会提升构建速度呢？**原因在于dll中大多包含的是常用的第三方模块，如react、react-dom，所以只要这些模块版本不升级，就只需被编译一次。我认为这样做和配置resolve.alias和module.noParse的效果有异曲同工的效果。

使用方法：
- 使用DllPlugin配置一个webpack_dll.config.js来构建dll文件
- 在主config文件里使用DllReferencePlugin插件引入xx.manifest.json文件

##### 1.3 使用HappyPack开启多进程Loader转换
在整个构建流程中，最耗时的就是Loader对文件的转换操作了，而运行在Node.js之上的Webpack是单线程模型的，也就是只能一个一个文件进行处理，不能并行处理。HappyPack可以将任务分解给多个子进程，最后将结果发给主进程。JS是单线程模型，只能通过这种多进程的方式提高性能。
```
   plugins:[
            new HappyPack({
                id:'babel',
                loaders:['babel-loader?cacheDirectory']
            }),
            new HappyPack({
                id:'css',
                loaders:['css-loader']
            })
        ]
```
除了id和loaders，HappyPack还支持这三个参数：threads、verbose、threadpool，threadpool代表共享进程池，即多个HappyPack实例都用同个进程池中的子进程处理任务，以防资源占用过多。

##### 1.4 使用ParallelUglifyPlugin开启多进程压缩JS文件
使用UglifyJS插件压缩JS代码时，需要先将代码解析成Object表示的AST（抽象语法树），再去应用各种规则去分析和处理AST，所以这个过程计算量大耗时较多。ParallelUglifyPlugin可以开启多个子进程，每个子进程使用UglifyJS压缩代码，可以并行执行，能显著缩短压缩时间。
```
plugins: [
    new ParallelUglifyPlugin({
        uglifyJS:{
            //...这里放uglifyJS的参数
        },
        //...其他ParallelUglifyPlugin的参数，设置cacheDir可以开启缓存，加快构建速度
    })
]
```

#### 二、优化开发体验
开发过程中修改源码后，需要自动构建和刷新浏览器，以查看效果。这个过程可以使用Webpack实现自动化，Webpack负责监听文件的变化，DevServer负责刷新浏览器。

##### 2.1 使用自动刷新
- 1.Webpack可以使用两种方式开启监听：1. 启动webpack时加上--watch参数；2. 在配置文件中设置watch:true。此外还有如下配置参数。合理设置watchOptions可以优化监听体验。
ignored：设置不监听的目录，排除node_modules后可以显著减少Webpack消耗的内存
aggregateTimeout：文件变动后多久发起构建，避免文件更新太快而造成的频繁编译以至卡死，越大越好
poll：通过向系统轮询文件是否变化来判断文件是否改变，poll为每秒询问次数，越小越好

- 2.DevServer刷新浏览器有两种方式：

- 向网页中注入代理客户端代码，通过客户端发起刷新
- 向网页装入一个iframe，通过刷新iframe实现刷新效果

默认情况下，以及 devserver: {inline:true} 都是采用第一种方式刷新页面。第一种方式DevServer因为不知道网页依赖哪些Chunk，所以会向每个chunk中都注入客户端代码，当要输出很多chunk时，会导致构建变慢。而一个页面只需要一个客户端，所以关闭inline模式可以减少构建时间，chunk越多提升月明显。关闭方式：

启动时使用webpack-dev-server --inline false
配置 devserver:{inline:false}

关闭inline后入口网址变为http://localhost:8080/webpack-dev-server/
另外devServer.compress 参数可配置是否采用Gzip压缩，默认为false

##### 2.2 开启模块热替换HMR
模块热替换不刷新整个网页而只重新编译发生变化的模块，并用新模块替换老模块，所以预览反应更快，等待时间更少，同时不刷新页面能保留当前网页的运行状态。原理也是向每一个chunk中注入代理客户端来连接DevServer和网页。开启方式：

webpack-dev-server --hot
使用HotModuleReplacementPlugin，比较麻烦

开启后如果修改子模块就可以实现局部刷新，但如果修改的是根JS文件，会整页刷新，原因在于，子模块更新时，事件一层层向上传递，直到某层的文件接收了当前变化的模块，然后执行回调函数。如果一层层向外抛直到最外层都没有文件接收，就会刷新整页。
使用 NamedModulesPlugin 可以使控制台打印出被替换的模块的名称而非数字ID，另外同webpack监听，忽略node_modules目录的文件可以提升性能。

####  三、优化输出质量-压缩文件体积
##### 3.1 区分环境--减小生产环境代码体积
代码运行环境分为开发环境和生产环境，代码需要根据不同环境做不同的操作，许多第三方库中也有大量的根据开发环境判断的if else代码，构建也需要根据不同环境输出不同的代码，所以需要一套机制可以在源码中区分环境，区分环境之后可以使输出的生产环境的代码体积减小。Webpack中使用DefinePlugin插件来定义配置文件适用的环境。

```
plugins:[
    new DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    })
]
```
注意，JSON.stringify('production') 的原因是，环境变量值需要一个双引号包裹的字符串，而stringify后的值是'"production"'

然后就可以在源码中使用定义的环境：
```
if(process.env.NODE_ENV === 'production'){
    console.log('你在生产环境')
    doSth();
}else{
    console.log('你在开发环境')
    doSthElse();
}
```

当代码中使用了process时，Webpack会自动打包进process模块的代码以支持非Node.js的运行环境，这个模块的作用是模拟Node.js中的process，以支持process.env.NODE_ENV === 'production' 语句。

##### 3.2 压缩代码-JS、ES、CSS
- 1.压缩JS：Webpack内置UglifyJS插件、ParallelUglifyPlugin
  - 会分析JS代码语法树，理解代码的含义，从而做到去掉无效代码、去掉日志输入代码、缩短变量名等优化。常用配置参数如下：
使用webpack --optimize-minimize 启动webpack，可以注入默认配置的UglifyJSPlugin

- 2.压缩ES6：第三方UglifyJS插件
  - 随着越来越多的浏览器支持直接执行ES6代码，应尽可能的运行原生ES6，这样比起转换后的ES5代码，代码量更少，且ES6代码性能更好。直接运行ES6代码时，也需要代码压缩，第三方的uglify-webpack-plugin提供了压缩ES6代码的功能
  - 另外要防止babel-loader转换ES6代码，要在.babelrc中去掉babel-preset-env，因为正是babel-preset-env负责把ES6转换为ES5。
- 3.压缩CSS：css-loader?minimize、PurifyCSSPlugin
  - cssnano基于PostCSS，不仅是删掉空格，还能理解代码含义，例如把color:#ff0000 转换成 color:red，css-loader内置了cssnano，只需要使用 css-loader?minimize 就可以开启cssnano压缩。
另外一种压缩CSS的方式是使用PurifyCSSPlugin，需要配合 extract-text-webpack-plugin 使用，它主要的作用是可以去除没有用到的CSS代码，类似JS的Tree Shaking。

##### 3.3 使用Tree Shaking剔除JS死代码
Tree Shaking可以剔除用不上的死代码，它依赖ES6的import、export的模块化语法，最先在Rollup中出现，Webpack 2.0将其引入。适合用于Lodash、utils.js等工具类较分散的文件。它正常工作的前提是代码必须采用ES6的模块化语法，因为ES6模块化语法是静态的（在导入、导出语句中的路径必须是静态字符串，且不能放入其他代码块中）。如果采用了ES5中的模块化，例如module.export = {...}、require( x+y )、if (x) { require( './util' ) }，则Webpack无法分析出可以剔除哪些代码。

启用Tree Shaking：


- 1.修改.babelrc以保留ES6模块化语句：
```
{
    "presets": [
        [
            "env", 
            { "module": false },   //关闭Babel的模块转换功能，保留ES6模块化语法
        ]
    ]
}
```

- 2.启动webpack时带上 --display-used-exports可以在shell打印出关于代码剔除的提示
- 3.使用UglifyJSPlugin，或者启动时使用--optimize-minimize
- 4.在使用第三方库时，需要配置 resolve.mainFields: ['jsnext:main', 'main'] 以指明解析第三方库代码时，采用ES6模块化的代码入口

#### 四、优化输出质量--加速网络请求
##### 4.1 使用CDN加速静态资源加载
- 1.CND加速的原理
CDN通过将资源部署到世界各地，使得用户可以就近访问资源，加快访问速度。要接入CDN，需要把网页的静态资源上传到CDN服务上，在访问这些资源时，使用CDN服务提供的URL。
由于CDN会为资源开启长时间的缓存，例如用户从CDN上获取了index.html，即使之后替换了CDN上的index.html，用户那边仍会在使用之前的版本直到缓存时间过期。业界做法：

- HTML文件：放在自己的服务器上且关闭缓存，不接入CDN
- 静态的JS、CSS、图片等资源：开启CDN和缓存，同时文件名带上由内容计算出的Hash值，这样只要内容变化hash就会变化，文件名就会变化，就会被重新下载而不论缓存时间多长。

另外，HTTP1.x版本的协议下，浏览器会对于向同一域名并行发起的请求数限制在4~8个。那么把所有静态资源放在同一域名下的CDN服务上就会遇到这种限制，所以可以把他们分散放在不同的CDN服务上，例如JS文件放在js.cdn.com下，将CSS文件放在css.cdn.com下等。这样又会带来一个新的问题：增加了域名解析时间，这个可以通过dns-prefetch来解决 <link rel='dns-prefetch' href='//js.cdn.com'> 来缩减域名解析的时间。形如**//xx.com 这样的URL省略了协议**，这样做的好处是，浏览器在访问资源时会自动根据当前URL采用的模式来决定使用HTTP还是HTTPS协议。

- 2.总之，构建需要满足以下几点：
  - 静态资源导入的URL要变成指向CDN服务的绝对路径的URL
  - 静态资源的文件名需要带上根据内容计算出的Hash值
  - 不同类型资源放在不同域名的CDN上

##### 4.2 多页面应用提取页面间公共代码，以利用缓存
1.原理
大型网站通常由多个页面组成，每个页面都是一个独立的单页应用，多个页面间肯定会依赖同样的样式文件、技术栈等。如果不把这些公共文件提取出来，那么每个单页打包出来的chunk中都会包含公共代码，相当于要传输n份重复代码。如果把公共文件提取出一个文件，那么当用户访问了一个网页，加载了这个公共文件，再访问其他依赖公共文件的网页时，就直接使用文件在浏览器的缓存，这样公共文件就只用被传输一次。

2.应用方法
  1.把多个页面依赖的公共代码提取到common.js中，此时common.js包含基础库的代码
  2.找出依赖的基础库，写一个base.js文件，再与common.js提取公共代码到base中，common.js就剔除了基础库代码，而base.js保持不变
  3.得到基础库代码base.js，不含基础库的公共代码common.js，和页面各自的代码文件xx.js。页面引用顺序如下：base.js--> common.js--> xx.js

##### 4.3 分割代码以按需加载
1.原理
单页应用的一个问题在于使用一个页面承载复杂的功能，要加载的文件体积很大，不进行优化的话会导致首屏加载时间过长，影响用户体验。做按需加载可以解决这个问题。具体方法如下：
    - 1.将网站功能按照相关程度划分成几类
    - 2.每一类合并成一个Chunk，按需加载对应的Chunk
    - 3.例如，只把首屏相关的功能放入执行入口所在的Chunk，这样首次加载少量的代码，其他代码要用到的时候再去加载。最好提前预估用户接下来的操作，提前加载对应代码，让用户感知不到网络加载
2.做法
一个最简单的例子：网页首次只加载main.js，网页展示一个按钮，点击按钮时加载分割出去的show.js，加载成功后执行show.js里的函数
```
//main.js
document.getElementById('btn').addEventListener('click',function(){
    import(/* webpackChunkName:"show" */ './show').then((show)=>{
        show('Webpack');
    })
})
//show.js
module.exports = function (content) {
    window.alert('Hello ' + content);
}
```
import(/* webpackChunkName:show */ './show').then() 是实现按需加载的关键，Webpack内置对import( *)语句的支持，Webpack会以./show.js为入口重新生成一个Chunk。代码在浏览器上运行时只有点击了按钮才会开始加载show.js，且import语句会返回一个Promise，加载成功后可以在then方法中获取加载的内容。这要求浏览器支持Promise API，对于不支持的浏览器，需要注入Promise polyfill。/* webpackChunkName:show */ 是定义动态生成的Chunk的名称，默认名称是[id].js，定义名称方便调试代码。为了正确输出这个配置的ChunkName，还需要配置Webpack：

```
//...
output:{
    filename:'[name].js',
    chunkFilename:'[name].js', //指定动态生成的Chunk在输出时的文件名称
}
```

#### 五、优化输出质量--提升代码运行时的效率
##### 5.1 使用Prepack提前求值
- 1.原理：
Prepack是一个部分求值器，编译代码时提前将计算结果放到编译后的代码中，而不是在代码运行时才去求值。通过在便一阶段预先执行源码来得到执行结果，再直接将运行结果输出以提升性能。但是现在Prepack还不够成熟，用于线上环境还为时过早。
- 2.使用方法
```
const PrepackWebpackPlugin = require('prepack-webpack-plugin').default;
module.exports = {
    plugins:[
        new PrepackWebpackPlugin()
    ]
}
```

##### 5.2 使用Scope Hoisting
1.原理
译作“作用域提升”，是在Webpack3中推出的功能，它分析模块间的依赖关系，尽可能将被打散的模块合并到一个函数中，但不能造成代码冗余，所以只有被引用一次的模块才能被合并。由于需要分析模块间的依赖关系，所以源码必须是采用了ES6模块化的，否则Webpack会降级处理不采用Scope Hoisting。
2.使用方法
```
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
//...
plugins:[
    new ModuleConcatenationPlugin();
],
resolve:{
	mainFields:['jsnext:main','browser','main']
}
```
webpack --display-optimization-bailout 输出日志中会提示哪个文件导致了降级处理

#### 六、使用输出分析工具
启动Webpack时带上这两个参数可以生成一个json文件，输出分析工具大多依赖该文件进行分析：
webpack --profile --json > stats.json 其中 --profile 记录构建过程中的耗时信息，--json 以JSON的格式输出构建结果，>stats.json 是UNIX / Linux系统中的管道命令，含义是将内容通过管道输出到stats.json文件中。


官方工具Webpack Analyse
打开该工具的官网http://webpack.github.io/analyse/上传stats.json，就可以得到分析结果


webpack-bundle-analyzer
可视化分析工具，比Webapck Analyse更直观。使用也很简单：

npm  i -g webpack-bundle-analyzer安装到全局
按照上面方法生成stats.json文件
在项目根目录执行webpack-bundle-analyzer ，浏览器会自动打开结果分析页面。

#### 七、其他Tips
- 配置babel-loader时，use: [‘babel-loader?cacheDirectory’] cacheDirectory用于缓存babel的编译结果，加快重新编译的速度。另外注意排除node_modules文件夹，因为文件都使用了ES5的语法，没必要再使用Babel转换。
- 配置externals，排除因为已使用<script>标签引入而不用打包的代码，noParse是排除没使用模块化语句的代码。
- 配置performance参数可以输出文件的性能检查配置。
- 配置profile：true，是否捕捉Webpack构建的性能信息，用于分析是什么原因导致构建性能不佳。
- 配置cache：true，是否启用缓存来提升构建速度。
- 可以使用url-loader把小图片转换成base64嵌入到JS或CSS中，减少加载次数。
- 通过imagemin-webpack-plugin压缩图片，通过webpack-spritesmith制作雪碧图。
- 开发环境下将devtool设置为cheap-module-eval-source-map，因为生成这种source map的速度最快，能加速构建。在生产环境下将devtool设置为hidden-source-map
 
### 常用git命令
- git add . 新增文件加入到git索引中
- git checkout 还原代码
- git commit -m "" 本地提交
- git push origin master 提交到git服务器
- git pull origin master 拉取git服务器
- git branch xxx 创建分支
- git checkout -b xxx/git checkout xxx 切换分支
- git merge xxx  合并分支

### 模块化-AMD
    - require.js
    - 全局define函数
    - 全局require函数
    - 依赖JS会自动、异步加载
### CommonJS
    - nodejs模块化规范,现在被大量用前端,原因:
    - 前端开发依赖的插件和库,都可以从npm中获取
    - 构建工具的高度自动化,使得使用npm的成本非常低
    - CommonJS不会异步加载JS,而是同步一次性加载出来
### 上线和回滚
    - 上线和回滚的基本流程
      - 将测试完成的代码提交到git版本库的master分支
      - 将当前服务器的代码全部打包并记录版本号,备份
      - 将master分支的代码提交覆盖到线上服务器,生成新版本
    - linux基本命令
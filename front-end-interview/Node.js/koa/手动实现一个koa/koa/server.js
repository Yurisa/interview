const Koa = require('./application')
const app = new Koa()
function delay(){
    return new Promise((reslove,reject)=>{
        setTimeout(()=>{
        reslove()
        },2000)
    })
}
  
app.use(async (ctx,next)=>{
    ctx.body = '1'
    await next()
    ctx.body += '2'
})
app.use(async (ctx,next)=>{
    ctx.body += '3'
    await delay()
    await next()
    ctx.body += '4'
})
app.use(async (ctx,next)=>{
    ctx.body += '5'
    await next()
    ctx.body += '6'
})
// app.use((req, res) => {
//     res.writeHead(200)
//     res.end('hello')
// })

// app.use(async ctx => {
//     ctx.body = 'hello'
// })

app.listen(8080, () => {
    console.log('server listen running on port 8080');
})

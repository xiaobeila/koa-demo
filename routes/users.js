const router = require('koa-router')()

router.prefix('/users')

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })

// 增加返回表单页面的路由
// router.get('/user', async(ctx, next)=>{
//   ctx.response.body = 
//   `
//     <form action="/users/user/register" method="post">
//       <input name="name" type="text" placeholder="请输入用户名：ikcamp"/> 
//       <br/>
//       <input name="password" type="text" placeholder="请输入密码：123456"/>
//       <br/> 
//       <button>GoGoGo</button>
//     </form>
//   `
// })

// // 增加响应表单请求的路由
// router.post('/user/register',async(ctx, next)=>{
//   let {name, password} = ctx.request.body
//   if( name === 'ikcamp' && password === '123456' ){
//     ctx.response.body = `Hello， ${name}！`
//   }else{
//     ctx.response.body = '账号信息错误'
//   }
// })

// router.get('/bar/:id/:name', function (ctx, next) {
//   // ctx.body = 'this is a users/bar response'
//   ctx.response.body = `<h1>HOME page ${ctx.params.id} ${ctx.params.name}</h1>`
//   console.log(ctx.params);
// })

module.exports = router

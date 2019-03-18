const router = require('koa-router')()
const HomeController = require('../controller/home')

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

router.get('/', HomeController.index)

router.get('/login', HomeController.login)

router.get('/user/success', HomeController.success)

router.post('/user/register', HomeController.register)

// app.use(router.routes())
//   .use(router.allowedMethods())

// router.all('/*', async (ctx, next) => {
//   ctx.response.status = 404;
//   ctx.response.body = '<h1>404 Not Found</h1>';
// });

module.exports = router
const router = require('koa-router')()

module.exports = (app) => {
  router.get('/', app.controller.home.index)
  router.get('/login', app.controller.home.login)
  router.post('/user/register', app.controller.home.register)
  router.get('/user/success', app.controller.home.success)

  app.use(router.routes()).use(router.allowedMethods())
}
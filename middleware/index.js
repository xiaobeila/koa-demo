const path = require('path')
const ip = require('ip')
const staticFiles = require('koa-static')
const nunjucks = require('koa-nunjucks-2')
const bodyparser = require('koa-bodyparser')
const miSend = require('./mi-send')
// 引入日志中间件
const miLog = require('./mi-log/logger')
// 引入请求错误中间件
const miHttpError = require('./mi-http-error')
// 引入规则中件间
const miRule = require('./mi-rule')

module.exports = (app) => {
  // 应用请求错误中间件
  // app.use(miHttpError())
  app.use(miHttpError({
    errorPageFolder: path.resolve(__dirname, '../errorPage')
  }))
  // 将配置中间件的参数在注册中间件时作为参数传入
  app.use(miLog({
    env: app.env, // koa 提供的环境变量
    projectName: 'koa2-tutorial',
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: ip.address()
  }))


  app.use(staticFiles(path.resolve(__dirname, "../public")))
  app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../views'),
    nunjucksConfig: {
      trimBlocks: true
    }
  }));

  app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
  }))

  app.use(miSend())

  /**
   * 在接口的开头调用
   * 指定 controller 文件夹下的 js 文件，挂载在 app.controller 属性
   * 指定 service 文件夹下的 js 文件，挂载在 app.service 属性
   */
  miRule({
    app,
    rules: [{
        folder: path.join(__dirname, '../controller'),
        name: 'controller'
      },
      {
        folder: path.join(__dirname, '../service'),
        name: 'service'
      }
    ]
  })

  // 增加错误的监听处理
  app.on("error", (err, ctx) => {
    if (ctx && !ctx.headerSent && ctx.status < 500) {
      ctx.status = 500
    }
    if (ctx && ctx.log && ctx.log.error) {
      if (!ctx.state.logged) {
        ctx.log.error(err.stack)
      }
    }
  })
}
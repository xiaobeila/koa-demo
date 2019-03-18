const path = require('path')
const ip = require('ip')
const staticFiles = require('koa-static')
const nunjucks = require('koa-nunjucks-2')
const bodyparser = require('koa-bodyparser')
const miSend = require('./mi-send')
// 引入日志中间件
const miLog = require('./mi-log/logger')

module.exports = (app) => {
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
}
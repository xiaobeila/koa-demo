const HomeService = require("../service/home")
module.exports = {
  // 修改 index 方法
  index: async function (ctx, next) {
    await ctx.render("home/index", {
      title: "iKcamp欢迎您"
    })
  },
  login: async function (ctx, next) {
    await ctx.render("home/login", {
      title: "iKcamp欢迎您"
    })
  },
  success: async function (ctx, next) {
    await ctx.render("home/success")
  },
  // 修改 register 方法
  register: async function (ctx, next) {
    let params = ctx.request.body
    let name = params.name
    let password = params.password
    let res = await HomeService.register(name, password)
    console.log(res)
    if (res.status == "-1") {
      await ctx.render("home/login", res.data)
    } else {
      ctx.state.title = "个人中心"
      await ctx.redirect("/user/success", res.data)
    }
  }
}
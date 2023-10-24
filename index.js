const mount = require("koa-mount");
const serve = require("koa-static");
const koaRouter = require("@koa/router");
const fs = require("fs");

module.exports = (server) => {
  const router = new koaRouter({ prefix: "/editor/schema" });

  router.get("/(.*)", async (ctx, next) => {
    var html = fs.readFileSync(__dirname + "/dist/index.html");
    ctx.type = "html";
    ctx.body = html;
  });

  server.use(mount("/editor/schema", serve(__dirname + "/dist")));
  server.use(router.routes()).use(router.allowedMethods());
};

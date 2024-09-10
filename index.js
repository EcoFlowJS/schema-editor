import mount from "koa-mount";
import serve from "koa-static";
import koaRouter from "@koa/router";
import fs from "fs";

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

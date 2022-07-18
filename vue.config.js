const { defineConfig } = require("@vue/cli-service");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icon")).end();
    config.module
      .rule("icon")
      .test(/\.svg$/)
      .include.add(resolve("src/icon"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
  publicPath: "./",
  devServer: {
    open: false,
    host: "localhost",
    port: 8888,
    https: false,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_CROSS_ORIGIN,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
    },
  },
});

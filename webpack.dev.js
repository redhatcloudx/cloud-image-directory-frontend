const path = require('path');
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const { stylePaths } = require("./stylePaths");
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "9000";

module.exports = merge(common('development'), {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    https: true,
    static: "./dist",
    host: HOST,
    port: PORT,
    compress: true,
    //inline: true,
    historyApiFallback: true,
    //overlay: true,
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          ...stylePaths
        ],
        use: ["style-loader", "css-loader"]
      }
    ]
  }
});

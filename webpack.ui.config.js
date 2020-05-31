const CopyPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const WebpackBuildNotifierPlugin = require("webpack-build-notifier")

const config = {
  mode: "production",

  context: path.join(__dirname, "src", "ui"),

  entry: ["./index.tsx"],

  output: {
    path: path.join(__dirname, "assets", "ui"),
    filename: "index.js",
  },

  resolve: {
    // .mjs needed for https://github.com/graphql/graphql-js/issues/1272
    extensions: [".ts", ".tsx", ".js", "jsx", ".mjs"],
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        // fixes https://github.com/graphql/graphql-js/issues/1272
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./static/index.html",
      filename: "index.html",
      inject: "body",
    }),
    new CopyPlugin([
      {
        from: "./static/global.css",
        to: "global.css",
      },
    ]),
  ],
  target: "electron-renderer",
}

module.exports = (env) => {
  if (!env || env === "development") {
    return {
      ...config,

      mode: "development",

      devtool: "source-map",

      plugins: [
        ...config.plugins,
        new WebpackBuildNotifierPlugin({
          title: "Hypha Build",
        }),
      ],
      watch: true,
      watchOptions: {
        aggregateTimeout: 500,
      },
    }
  }

  return config
}

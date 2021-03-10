module.exports = (env, options) => ({
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src/")
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  }
});

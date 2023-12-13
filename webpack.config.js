import path from "path";

module.exports = {
  entry: "./showselectedbadge/src/main.jsx", // The entry point of your React app
  output: {
    path: path.resolve(__dirname, ".helixo-badge/extensions/ecom/assets"), // The output directory
    filename: "bundle.js", // The name of the bundled file
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/, // Match .css files
        use: ["style-loader", "css-loader"], // Use style-loader and css-loader
      },
    ],
  },
};

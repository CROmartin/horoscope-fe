// gatsby-node.js

exports.onCreateWebpackConfig = ({ actions, getConfig }: any) => {
  // Get the current Webpack configuration
  const config = getConfig();

  // Add a new rule for svg-react-loader
  config.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: "svg-react-loader",
      },
    ],
  });

  // Replace the Webpack configuration
  actions.replaceWebpackConfig(config);
};

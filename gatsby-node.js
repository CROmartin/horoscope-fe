// gatsby-node.js
const path = require(`path`);

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  // Get the current Webpack configuration
  const config = getConfig();

  // Add a new rule for svg-react-loader
  config.module.rules.push({
    test: /\.svg$/,
    use: ["@svgr/webpack", "url-loader"],
  });

  // Replace the Webpack configuration
  actions.replaceWebpackConfig(config);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      horoscop {
        getAllHoroscopeDaily {
          description
          name
          date
        }
        getAllHoroscopeWeekly {
          description
          name
          date
        }
        getAllHoroscopeYearly {
          description
          name
          date
        }
      }
    }
  `);
  console.log("Result:", result);
  const replaceChars = (str) => {
    return str
      .replace(/ă|â|Ă|Â/g, "a")
      .replace(/ș|Ș/g, "s")
      .replace(/ț|Ț/g, "t")
      .replace(/î|Î/g, "i");
  };

  const template = path.resolve("./src/templates/horoscopePage.tsx");
  const templateChinese = path.resolve(
    "./src/templates/horoscopeChinesePage.tsx"
  );

  result.data.horoscop.getAllHoroscopeDaily.forEach((item) => {
    createPage({
      path: `/horoscop-zilnic-${replaceChars(item.name.toLowerCase())}`,
      component: template,
      context: {
        sign: item.name,
        description: item.description,
        interval: "zilnic",
        date: item.date,
      },
    });
  });

  result.data.horoscop.getAllHoroscopeWeekly.forEach((item) => {
    createPage({
      path: `/horoscop-saptamanal-${replaceChars(item.name.toLowerCase())}`,
      component: template,
      context: {
        sign: item.name,
        description: item.description,
        interval: "saptamanal",
        date: item.date,
      },
    });
  });

  result.data.horoscop.getAllHoroscopeYearly.forEach((item) => {
    createPage({
      path: `/horoscop-anual-${replaceChars(item.name.toLowerCase())}`,
      component: templateChinese,
      context: {
        sign: item.name,
        signStandard: replaceChars(item.name.toLowerCase()),
        description: item.description,
        interval: "anual",
        date: item.date,
      },
    });
  });
};

const DAILY_SIGN_SLUGS = [
  "berbec",
  "taur",
  "gemeni",
  "rac",
  "leu",
  "fecioara",
  "balanta",
  "scorpion",
  "sagetator",
  "capricorn",
  "varsator",
  "pesti",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return DAILY_SIGN_SLUGS.map((sign) => ({
      source: `/horoscop-azi-${sign}`,
      destination: `/horoscop-zilnic-${sign}`,
      permanent: true,
    }));
  },
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};

export default nextConfig;

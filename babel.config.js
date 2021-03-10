module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "inline-dotenv",
      [
        "module-resolver",
        {
          alias: {
            "#assets": "./assets",
            "#hooks": "./hooks",
            "#lib": "./lib",
            "#context": "./context",
            "#screens": "./screens",
            "#components": "./components",
          },
        },
      ],
    ],
  };
};

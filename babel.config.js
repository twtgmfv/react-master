module.exports = function (api) {
    api.cache(true);
    const presets = [
        "@babel/preset-react",
        [
            "@babel/preset-env",
            {
                "modules": false,
                "useBuiltIns": "usage"
            }
        ],
        "@babel/preset-typescript"
    ];
    const plugins= [
        "@babel/transform-runtime",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-syntax-dynamic-import"
    ];
    return {
      presets,
      plugins,
      sourceType: 'unambiguous'
    }
  }

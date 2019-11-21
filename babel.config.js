module.exports = () => {
  const presets = [['@babel/preset-env', { modules: false }]];
  const plugins = ['@babel/plugin-transform-runtime'];

  return {
    plugins,
    presets,
  };
};

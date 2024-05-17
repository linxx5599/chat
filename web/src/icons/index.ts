const requireAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().map(requireContext);
const svgs = require.context("./svg", false, /\.svg$/);
export default () => requireAll(svgs);

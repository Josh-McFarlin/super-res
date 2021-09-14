/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("bin");

module.exports = defaultConfig;

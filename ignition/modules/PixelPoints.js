// eslint-disable-next-line @typescript-eslint/no-require-imports
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("PixelPointsModule", (m) => {
  const pixelPoints = m.contract("PixelPoints");
  return { pixelPoints };
});

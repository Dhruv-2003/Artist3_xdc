require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

const APOTHEM_RPC = "https://erpc.apothem.network";
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    // Define the sepolia network parameters here
    xdcApothem: {
      url: APOTHEM_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

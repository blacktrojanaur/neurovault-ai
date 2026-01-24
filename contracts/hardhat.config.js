require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

console.log("✅ Loaded PRIVATE_KEY:", process.env.PRIVATE_KEY);
console.log("✅ Address preview:", require("ethers").Wallet.createRandom().address);

module.exports = {
  solidity: "0.8.20",
  networks: {
    monad: {
      url: "https://testnet-rpc.monad.xyz",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};



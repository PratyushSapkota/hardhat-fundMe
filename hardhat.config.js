require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-deploy");


module.exports = {
  solidity: "0.8.18",
  networks: {

    sepolia: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY1],
      chainId: 11155111,
      blockConformation: 6,
    }

  },
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    }
  }
};

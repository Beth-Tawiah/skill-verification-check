
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";


dotenv.config();

const config: HardhatUserConfig = {
  // solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 31337,
      },
      mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/t2kNu0Pju1xnyvgTDvZN3_cbitoqzVJi",
      accounts: ["0bbb459f78d65b9fc08dfe330214ebc6087c884b0a7148a9be83f015404005bb"],

    },
    },

    solidity: {
      version: "0.8.19", // Match this with your contract's pragma version.
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },

  };
  





export default config;

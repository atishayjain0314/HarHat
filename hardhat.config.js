/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")
const ALCHEMY_API_KEY = "upFcjVsfwhVOhJsQ5VB7Wkt-Klf2fsOz";
const MUMBAI_PRIVATE_KEY = "";
module.exports = {
  solidity: "0.8.18",
  networks:{
    mumbai:{
      url:`https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts:[`${MUMBAI_PRIVATE_KEY}`]
    }
  }
};

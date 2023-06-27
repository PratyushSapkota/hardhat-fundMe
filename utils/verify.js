const { run } = require("hardhat")

async function verify(contractAddress, args) {
    console.log("Verifying on Etherscan");
  
    try {
      await run("verify:verify", {
        address: contractAddress,
        constructorArguments: args,
      });
    } catch (e) {
      if (e.message.toLowerCase().includes("does not have bytecode")) {
        console.log("Already Verified")
      } else {
        console.log(e.message);
      }
    }
  }

module.exports = {
    verify,
}
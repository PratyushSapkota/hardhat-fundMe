const { network } = require("hardhat")
const { developmentChain, networkConfig, DECIMALS, INITIAL_ANSWER } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    if (developmentChain.includes(network.name)){
        log("Local network detected! Deploying a mock contract instead");
        await deploy('MockV3Aggregator', {
            contract: 'MockV3Aggregator',
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER]
        });
        log("Mocks Deployed");
        log("__________________________________________________________________________________");

    }

}

module.exports.tags = ["all", "mocks"]
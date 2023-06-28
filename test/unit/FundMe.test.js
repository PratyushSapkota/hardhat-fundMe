const { assert, expect } = require("chai")
const { ethers } = require("hardhat")

describe("FundMe", async function () {
    let fundMe
    let deployer
    let mockV3Aggregator

    beforeEach(async function () {
        mockV3Aggregator = await ethers.deployContract("MockV3Aggregator", [18, 0])
        await mockV3Aggregator.waitForDeployment();

        fundMe = await ethers.deployContract("FundMe", [mockV3Aggregator.target])
        await fundMe.waitForDeployment(); 


    })

    describe("Constructor", async function () {
        it("Sets the aggregator address correctly", async function () {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.target)

        })
    })

    describe("Fund", async function() {
        it("Fails if not enough eth", async function() {
            await expect (fundMe.fund()).to.be.revertedWith("Need more eth!")
        })
    })


})

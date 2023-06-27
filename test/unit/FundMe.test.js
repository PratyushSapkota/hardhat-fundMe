const { assert, expect } = require("chai")
const { deployments, getNamedAccounts} = require("hardhat")
const { ethers } = require("@nomicfoundation/hardhat-ethers")

describe("FundMe", async function () {
    let fundMe
    let deployer
    let mockV3Aggregator

    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(['all'])
        fundMe = await ethers.getContract("FundMe", deployer)
        mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)

    })

    describe("Constructor", async function () {
        it("Sets the aggregator address correctly", async function () {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.address)

        })
    })

    describe("Fund", async function() {
        it("Fails if not enough eth", async function() {
            await expect (fundMe.fund()).to.be.revertedWith("Need more eth!")
        })
    })


})
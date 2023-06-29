const { assert, expect } = require("chai")
const { ethers } = require("hardhat")

describe("FundMe", async function () {
    let fundMe
    let mockV3Aggregator
    // const sendValue = (1 * 10 ** 18)
    const sendValue = ethers.parseEther("1000.0")
    console.log(sendValue)
    let deployerAddress

    beforeEach(async function () {
        mockV3Aggregator = await ethers.deployContract("MockV3Aggregator", [18, 0])
        await mockV3Aggregator.waitForDeployment()
        fundMe = await ethers.deployContract("FundMe", [mockV3Aggregator.target])
        await fundMe.waitForDeployment()
        
        let [signer] = await ethers.getSigners()
        deployerAddress = signer.getAddress()
        
    })

    describe("Constructor", async function () {
        it("Sets the aggregator address correctly", async function () {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.target)
        })
    })

    describe("Fund", async function () {
        it("Fails if not enough eth", async function () {
            expect(fundMe.fund())
        })

        it("Updates the amount funded mapping thing", async function () {

            await fundMe.fund({ value: sendValue })
            const getAmountFunded = await fundMe.addressToAmountFunded(deployerAddress)

            assert.equal(getAmountFunded, sendValue)
        })
    })


})

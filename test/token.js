const {expect} = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract",function(){
    it("Deployment should assgin the total supply of the token",async function(){
        const [owner] = await ethers.getSigners();
        console.log("Signers object:",owner);
        const Token = await ethers.getContractFactory("Token");
        const hardhatToken = await Token.deploy();
        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        console.log("Owner Address:",owner.address);
        expect (await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should transfer token between accounts",async function(){
        const [owner,addr1,addr2] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        const hardhatToken = await Token.deploy();
        await hardhatToken.transfer(addr1.address,10);
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);
        await hardhatToken.connect(addr1).transfer(addr2.address,5);
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(5);

    });
});


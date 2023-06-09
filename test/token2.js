const {expect} = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract",function(){
    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs; 
    beforeEach(async function(){
        [owner,addr1,addr2,...addrs] = await ethers.getSigners();
        Token = await ethers.getContractFactory("Token");
        hardhatToken = await Token.deploy();
    })

    describe("Deployment",function(){
        it("Should set the right",async function(){
            expect(await hardhatToken.owner()).to.equal(owner.address);
        })
        it("Should assign the total supply of tokens to the owner",async function(){
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(await hardhatToken.totalSupply());
        })
    })

    describe("Transactions",function(){
        it("Should transfer token between accounts",async function(){
            await hardhatToken.transfer(addr1.address,10);
            expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);

            await hardhatToken.connect(addr1).transfer(addr2.address,5);
            expect(await hardhatToken.balanceOf(addr2.address)).to.equal(5);
        })
        it("should fail if sender doesnot have enough tokens",async function(){
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await expect(hardhatToken.connect(addr1).transfer(owner.address,1)).to.be.revertedWith("Not enough tokens");
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        })

        it("Should update balances after transfers",async function(){
            const initialownerbalance = await hardhatToken.balanceOf(owner.address);
            await hardhatToken.transfer(addr1.address,5);
            await hardhatToken.transfer(addr2.address,10);

            const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialownerbalance-15);

            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(5);

            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(10);
        })
    })


})


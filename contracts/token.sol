//SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";
contract Token{
    string public name = "HardHat Toekn";
    string public symbol = "HHT";
    uint public totalSupply = 10000;
    address public owner;

    mapping(address=>uint) balance;

    constructor(){
        balance[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to,uint amount) external{
        console.log("**Sender balance is %s tokens**",balance[msg.sender]);
        console.log("**Sender is sending %s tokens to %s address**",amount,to);
        require(balance[msg.sender]>=amount,"Not enough tokens");
        balance[msg.sender]-=amount;
        balance[to]+=amount;
    }

    function balanceOf(address account) external view returns(uint){
        return balance[account];
    }
}
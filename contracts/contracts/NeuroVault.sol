// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract NeuroVault {
    address public owner;
    uint256 public totalDeposits;

    event Deposit(address user, uint256 amount);
    event StrategyExecuted(string strategy);

    constructor() {
        owner = msg.sender;
    }

    function deposit() external payable {
        require(msg.value > 0, "Zero deposit");
        totalDeposits += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function executeStrategy(string memory strategy) external {
        require(msg.sender == owner, "Only owner");
        emit StrategyExecuted(strategy);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}

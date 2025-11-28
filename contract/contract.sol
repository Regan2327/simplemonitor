// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/*
 Simple Savings Planner
 ----------------------
 - Users can deposit ETH.
 - Each user has their own savings balance.
 - Users can withdraw their own savings.
 - Beginner friendly and no deployment inputs.
*/

contract SavingsPlanner {

    // Store each user's total saved ETH
    mapping(address => uint256) public savings;

    // Events for tracking
    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    // Deposit ETH into the contract
    function deposit() external payable {
        require(msg.value > 0, "Send some ETH to deposit.");

        // Add deposited amount to the user's savings
        savings[msg.sender] += msg.value;

        emit Deposited(msg.sender, msg.value);
    }

    // Check your total savings
    function checkMySavings() external view returns (uint256) {
        return savings[msg.sender];
    }

    // Withdraw your saved ETH
    function withdraw(uint256 amount) external {
        require(amount > 0, "Withdraw amount must be > 0.");
        require(savings[msg.sender] >= amount, "Insufficient savings.");

        // Effects: Update balance before transfer (safety)
        savings[msg.sender] -= amount;

        // Interaction: Transfer ETH to user
        payable(msg.sender).transfer(amount);

        emit Withdrawn(msg.sender, amount);
    }
}
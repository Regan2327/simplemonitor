# Savings Planner — FLARE Smart Contract Integration

## **Contract Address**
`0xA311256948A1f7C5b92D63e642Ecd4b8D04816C6`  
Explorer: https://coston2-explorer.flare.network/address/0xA311256948A1f7C5b92D63e642Ecd4b8D04816C6

---<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/9385db39-3b0f-4f9d-ba07-ee0a3ee1186f" />



## **Project Description**
Savings Planner is a simple, user-friendly decentralized savings management tool built on the Flare (Coston2) network.  
It allows users to securely deposit and withdraw FLR using a verified on-chain smart contract.  
The purpose of the project is to help users track and manage their personal savings using blockchain technology—ensuring transparency, security, and full user control over funds.

The UI integrates directly with the deployed smart contract using Wagmi + Viem, with clean hooks and strong loading/error handling states.

---

## **Features**
- **Deposit FLR** directly into the contract using a single transaction  
- **Withdraw FLR** from your personal savings stored in the contract  
- **View real-time savings balance** using on-chain calls  
- **Full wallet gating** ensures only connected users can interact  
- **Transaction feedback** including pending, confirming, and confirmed states  
- **Error handling** displayed cleanly in the UI  
- **Fully modular architecture** (lib, hooks, components)

---

## **How It Solves the Problem**
Saving money on-chain is often complicated for beginners due to complex interfaces or confusing contract interactions.  
This project provides:

### **1. A Simple and Transparent Way to Save**
Users can view how much FLR they have saved with a single on-chain function (`checkMySavings`).

### **2. Secure Deposit and Withdrawal**
Only the wallet owner can access their balance—ensuring complete fund ownership.

### **3. No Middlemen or Custody**
Funds are stored trustlessly in a smart contract, not in a centralized app.

### **4. Perfect for Beginners**
The UI guides the user step-by-step with a clean layout, validation, and guidance.

### **5. Clear Use Cases**
- Personal on-chain savings  
- Recurring deposits  
- Transparent budgeting  
- Simple financial dApps demonstrating blockchain fundamentals  

---

This repository provides a strong foundation for expanding into advanced saving mechanisms such as lock periods, goals, interest modules, automated planning, or even gamified saving rewards in the future.



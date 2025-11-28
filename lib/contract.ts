export const CONTRACT_ADDRESS = '0xYourNewContractAddress'; // Update after deployment

export const CONTRACT_ABI = [
  {
    "inputs": [{"internalType": "string", "name": "_endpoint", "type": "string"}],
    "name": "addMonitor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_index", "type": "uint256"},
      {"internalType": "string", "name": "_status", "type": "string"}
    ],
    "name": "updateStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyMonitors",
    "outputs": [
      {
        "components": [
          {"internalType": "string", "name": "endpoint", "type": "string"},
          {"internalType": "uint256", "name": "lastChecked", "type": "uint256"},
          {"internalType": "bool", "name": "isActive", "type": "bool"},
          {"internalType": "string", "name": "status", "type": "string"}
        ],
        "internalType": "struct SimpleMonitor.Monitor[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMonitorCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_index", "type": "uint256"}],
    "name": "removeMonitor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

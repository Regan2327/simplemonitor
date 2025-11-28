// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleMonitor {
    // Monitor structure
    struct Monitor {
        string endpoint;
        uint256 lastChecked;
        bool isActive;
        string status;
    }
    
    // User monitors mapping
    mapping(address => Monitor[]) public userMonitors;
    
    // Events
    event MonitorAdded(address indexed user, string endpoint, uint256 timestamp);
    event StatusUpdated(address indexed user, uint256 monitorIndex, string status, uint256 timestamp);
    event MonitorRemoved(address indexed user, uint256 monitorIndex);
    
    // Add a new monitor
    function addMonitor(string memory _endpoint) external {
        Monitor memory newMonitor = Monitor({
            endpoint: _endpoint,
            lastChecked: block.timestamp,
            isActive: true,
            status: "pending"
        });
        
        userMonitors[msg.sender].push(newMonitor);
        emit MonitorAdded(msg.sender, _endpoint, block.timestamp);
    }
    
    // Update monitor status
    function updateStatus(uint256 _index, string memory _status) external {
        require(_index < userMonitors[msg.sender].length, "Monitor does not exist");
        
        userMonitors[msg.sender][_index].status = _status;
        userMonitors[msg.sender][_index].lastChecked = block.timestamp;
        
        emit StatusUpdated(msg.sender, _index, _status, block.timestamp);
    }
    
    // Get all user monitors
    function getMyMonitors() external view returns (Monitor[] memory) {
        return userMonitors[msg.sender];
    }
    
    // Get monitor count
    function getMonitorCount() external view returns (uint256) {
        return userMonitors[msg.sender].length;
    }
    
    // Toggle monitor active status
    function toggleMonitor(uint256 _index) external {
        require(_index < userMonitors[msg.sender].length, "Monitor does not exist");
        userMonitors[msg.sender][_index].isActive = !userMonitors[msg.sender][_index].isActive;
    }
    
    // Remove a monitor
    function removeMonitor(uint256 _index) external {
        require(_index < userMonitors[msg.sender].length, "Monitor does not exist");
        
        // Move last element to deleted position and pop
        userMonitors[msg.sender][_index] = userMonitors[msg.sender][userMonitors[msg.sender].length - 1];
        userMonitors[msg.sender].pop();
        
        emit MonitorRemoved(msg.sender, _index);
    }
}

}

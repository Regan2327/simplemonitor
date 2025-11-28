"use client";
import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';

export default function MonitorDashboard() {
  const { address, isConnected } = useAccount();
  const [endpoint, setEndpoint] = useState('');
  const [monitors, setMonitors] = useState([]);

  // Write contract for adding monitor
  const { writeContract: addMonitor, isPending: isAdding } = useWriteContract();

  // Read contract for getting monitors
  const { data: monitorData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getMyMonitors',
  });

  useEffect(() => {
    if (monitorData) {
      setMonitors(monitorData as any);
    }
  }, [monitorData]);

  const handleAddMonitor = async () => {
    if (!endpoint) return;
    
    try {
      await addMonitor({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'addMonitor',
        args: [endpoint],
      });
      setEndpoint('');
    } catch (error) {
      console.error('Error adding monitor:', error);
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center p-8">
        <p className="text-xl">Please connect your wallet to use SimpleMonitor</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">SimpleMonitor Dashboard</h1>
      
      {/* Add Monitor Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Monitor</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="Enter endpoint URL (e.g., https://example.com)"
            className="flex-1 p-3 border rounded"
          />
          <button
            onClick={handleAddMonitor}
            disabled={isAdding || !endpoint}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isAdding ? 'Adding...' : 'Add Monitor'}
          </button>
        </div>
      </div>

      {/* Monitors List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Your Monitors ({monitors.length})</h2>
        {monitors.length === 0 ? (
          <p className="text-gray-500">No monitors added yet</p>
        ) : (
          <div className="space-y-4">
            {monitors.map((monitor: any, index: number) => (
              <div key={index} className="border p-4 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{monitor.endpoint}</p>
                    <p className="text-sm text-gray-600">Status: {monitor.status}</p>
                    <p className="text-xs text-gray-500">
                      Last checked: {new Date(Number(monitor.lastChecked) * 1000).toLocaleString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm ${
                    monitor.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {monitor.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

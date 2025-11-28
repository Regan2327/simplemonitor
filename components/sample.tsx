"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useSavingsContract } from "@/hooks/useContract"

const SampleIntregation = () => {
  const { isConnected } = useAccount()

  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")

  const { data, actions, state } = useSavingsContract()

  const handleDeposit = async () => {
    if (!depositAmount) return
    await actions.deposit(depositAmount)
    setDepositAmount("")
  }

  const handleWithdraw = async () => {
    if (!withdrawAmount) return
    await actions.withdraw(withdrawAmount)
    setWithdrawAmount("")
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-foreground mb-3">Savings Planner</h2>
          <p className="text-muted-foreground">Please connect your wallet to interact with the contract.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">Savings Planner</h1>

        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">My Savings</p>
          <p className="text-2xl font-semibold text-foreground">{data.myBalance} FLR</p>
        </div>

        <div className="space-y-6">
          {/* Deposit */}
          <div>
            <label className="block mb-2 text-sm font-medium text-foreground">Deposit FLR</label>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-2 bg-card border border-border rounded-lg mb-3"
            />
            <button
              onClick={handleDeposit}
              disabled={state.isLoading || !depositAmount}
              className="w-full bg-primary text-primary-foreground px-6 py-2 rounded-lg"
            >
              {state.isLoading ? "Processing..." : "Deposit"}
            </button>
          </div>

          {/* Withdraw */}
          <div>
            <label className="block mb-2 text-sm font-medium text-foreground">Withdraw FLR</label>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-2 bg-card border border-border rounded-lg mb-3"
            />
            <button
              onClick={handleWithdraw}
              disabled={state.isLoading || !withdrawAmount}
              className="w-full bg-destructive text-destructive-foreground px-6 py-2 rounded-lg"
            >
              {state.isLoading ? "Processing..." : "Withdraw"}
            </button>
          </div>
        </div>

        {/* Status */}
        {state.hash && (
          <div className="mt-6 p-4 bg-card border border-border rounded-lg">
            <p className="text-xs text-muted-foreground uppercase mb-2">Transaction Hash</p>
            <p className="text-sm font-mono break-all mb-3">{state.hash}</p>
            {state.isConfirming && <p className="text-sm text-primary">Confirming...</p>}
            {state.isConfirmed && <p className="text-sm text-green-500">Transaction Confirmed!</p>}
          </div>
        )}

        {state.error && (
          <div className="mt-6 p-4 bg-card border border-destructive rounded-lg">
            <p className="text-red-500 text-sm">Error: {state.error.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SampleIntregation

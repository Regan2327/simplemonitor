"use client"

import { useState, useEffect } from "react"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseEther, formatEther } from "viem"
import { contractABI, contractAddress } from "@/lib/contract"

export interface ContractState {
  isLoading: boolean
  isPending: boolean
  isConfirming: boolean
  isConfirmed: boolean
  hash: `0x${string}` | undefined
  error: Error | null
}

export interface ContractActions {
  deposit: (amount: string) => Promise<void>
  withdraw: (amount: string) => Promise<void>
}

export const useSavingsContract = () => {
  const { address } = useAccount()
  const [isLoading, setIsLoading] = useState(false)

  const { data: myBalance, refetch: refetchMyBalance } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "checkMySavings",
    query: { enabled: !!address }
  })

  const { writeContractAsync, data: hash, error, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (isConfirmed) refetchMyBalance()
  }, [isConfirmed, refetchMyBalance])

  const deposit = async (amount: string) => {
    if (!amount) return
    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "deposit",
        value: parseEther(amount)
      })
    } finally {
      setIsLoading(false)
    }
  }

  const withdraw = async (amount: string) => {
    if (!amount) return
    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "withdraw",
        args: [parseEther(amount)]
      })
    } finally {
      setIsLoading(false)
    }
  }

  const actions: ContractActions = { deposit, withdraw }

  const state: ContractState = {
    isLoading: isLoading || isPending || isConfirming,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error
  }

  return {
    data: {
      myBalance: myBalance ? formatEther(myBalance as bigint) : "0"
    },
    actions,
    state
  }
}

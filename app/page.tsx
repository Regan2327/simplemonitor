import WalletConnect from "@/components/Wallet-connect";
import MonitorDashboard from "@/components/Monitor";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <WalletConnect />
      <MonitorDashboard />
    </main>
  );
}

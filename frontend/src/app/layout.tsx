import "./global.css";
import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/Navbar";
import { WalletProvider } from "@/context/WalletContext";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <WalletProvider>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Navbar />
              <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}

import "./global.css";

export const metadata = {
  title: "NeuroVault.AI",
  description: "AI-Powered DeFi Agent",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Virtual Intreviewer and Virtual Conversationalist",
  description: "Improve your interview skills and English speaking effortlessly with practice sessions tailored for interviews and conversations"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="!scroll-smooth scrollbar-thin scrollbar-thumb-[#69a6ba7c] scrollbar-track-white">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

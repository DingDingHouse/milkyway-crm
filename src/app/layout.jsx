import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/redux/Providers";
import { Toaster } from "react-hot-toast";

const inter = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Game Crm",
  description: "Game Crm",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="bottomcenter"/>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

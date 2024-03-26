import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/ui/navbar";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Lightweight",
  description: "The greatest benefits for our greatest customers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
      <Navbar/>
      {children}
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Heart Rate Zone Calculator",
  description: "This app is for finding your heart rate zone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-indigo-600 ${inter.className}`}>{children}</body>
    </html>
  );
}

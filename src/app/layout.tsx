import "./globals.css";
import { Head } from "./head";
import { SafeArea } from "@/components";
import localFont from "next/font/local";

// Font files can be colocated inside of `app`

const apercu = localFont({
  src: '/apercu-regular-pro.woff2',
  display: "swap",
  variable: "--font-apercu",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="antialiased" lang="en">
      <Head />
      <body className={`antialiased`}>
        <SafeArea>{children}</SafeArea>
      </body>
    </html>
  );
}

"use client";
import { useEffect } from "react";
import "./globals.css";

import { Canvas } from "@react-three/fiber";
import { SafeArea } from "@/components";
import localFont from "next/font/local";



const apercu = localFont({
  src: '/apercu-regular-pro.woff2',
  variable: "--font-apercu",
  preload: true,
  weight: 'normal'
});

const apercuMedium = localFont({
  src: '/apercu-medium-pro.woff2',
  variable: "--font-apercu-medium",
  preload: true,
  weight: 'normal'
});

const apercuBold = localFont({
  src: '/apercu-bold-pro.woff2',
  variable: "--font-apercu-bold",
  preload: true,
  weight: 'normal'
});

const montserat = localFont({
  src: '/Montserrat.ttf',
  variable: "--font-montserrat",
  preload: true,
  weight: "100 900"
});




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="antialiased" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        </head>
      <body className={`antialiased`}>
        <SafeArea><Canvas camera={{ position: [0, 0, 0], fov: 65 }} >{children}</Canvas></SafeArea>
      </body>
    </html>
  );
}

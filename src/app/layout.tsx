"use client";
import {ApolloProvider} from "@apollo/client";
import client from "@/lib/apolloClient";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ApolloProvider client={client}>
          <I18nextProvider i18n={i18n}>
              {children}
          </I18nextProvider>
      </ApolloProvider>
      </body>
    </html>
  );
}

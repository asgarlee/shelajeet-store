import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from './providers';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ladakhi Shilajeet Store - Premium Quality Natural Product",
  description: "Buy high-quality Ladakhi Shilajeet, a natural mineral compound known for its health benefits. Sourced from the mountains of Ladakh. Fast shipping across India.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

// src/app/layout.js or layout.jsx
import "./globals.css";

export const metadata = {
  title: "GroceryHub",
  description: "Smart Inventory and Sales Management for Grocery Stores.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body className="min-h-screen font-sans bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white">
        {children}
      </body>
    </html>
  );
}

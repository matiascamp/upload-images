import type { Metadata } from "next";
import { inter } from "@/ui/fonts";
import { Providers } from "./providers";
import "./globals.css";



export const metadata: Metadata = {
  title: "Upload images app",
  description: "App created in next js to upload images",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
        <Providers>
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

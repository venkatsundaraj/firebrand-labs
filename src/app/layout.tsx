import type { Metadata } from "next"
import { Inter, Roboto } from "next/font/google"
import { Raleway } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--paragraph" })
const roboto = Raleway({
  subsets: ["latin"],
  variable: "--heading",
})

export const metadata: Metadata = {
  title: "Firebrand Labs | Homepage",
  description: "Firebrand Labs | Homepage",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          `${inter.variable} ${roboto.variable}`,
          "antialiased grainy font-sans min-h-screen w-screen bg-background relative overflow-x-hidden"
        )}
      >
        {children}
      </body>
    </html>
  )
}

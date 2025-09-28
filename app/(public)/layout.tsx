import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Arafat Islam - Full Stack Developer",
  
  description:
    "Full-stack developer specializing in React, Next.js, and modern web technologies. Creating beautiful, functional web experiences.",
  keywords: ["web developer", "full stack", "react", "next.js", "typescript", "portfolio"],
  authors: [{ name: "Arafat Islam" }],
  creator: "Arafat Islam",
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://arafatislam.dev",
    title: "Arafat Islam - Full Stack Developer",
    description: "Full-stack developer specializing in React, Next.js, and modern web technologies.",
    siteName: "Arafat Islam Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arafat Islam - Full Stack Developer",
    description: "Full-stack developer specializing in React, Next.js, and modern web technologies.",
    creator: "@arafat_isl49899",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main >{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pentecostal Songbook",
  description: "Digital songbook reader built with Next.js"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
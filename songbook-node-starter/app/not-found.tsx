import Link from "next/link"

export default function NotFoundPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Song not found</h1>
      <p>The song you requested could not be found.</p>
      <Link href="/">Go back home</Link>
    </main>
  )
}
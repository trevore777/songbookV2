import { PDF_OFFSET } from "@/lib/config"

export default function ReaderPage() {
  const firstSongPage = 1 + PDF_OFFSET

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Songbook Reader</h1>
      <p>Full PDF reader for the scanned songbook.</p>

      <iframe
        src={`/songbook.pdf#page=${firstSongPage}`}
        width="100%"
        height="900"
        style={{ border: "1px solid #ccc", marginTop: "1rem" }}
      />
    </main>
  )
}
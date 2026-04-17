import Link from "next/link"
import { notFound } from "next/navigation"
import { getSongById } from "@/lib/songs"
import { PDF_OFFSET } from "@/lib/config"

type Props = {
  params: Promise<{ id: string }>
}

export default async function SongPage({ params }: Props) {
  const { id } = await params
  const song = getSongById(id)

  if (!song) {
    notFound()
  }

  const printedSongPage = song.pages?.[0] ?? 1
  const pdfPage = printedSongPage + PDF_OFFSET

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <Link href="/search">← Back to Search</Link>

      <h1 style={{ marginTop: "1rem" }}>
        {song.number}. {song.title}
      </h1>

      <div style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
        {song.key && (
          <p><strong>Key:</strong> {song.key}</p>
        )}

        {song.firstLine && (
          <p><strong>First line:</strong> {song.firstLine}</p>
        )}

        {song.scriptureRefs?.length > 0 && (
          <p><strong>Scripture:</strong> {song.scriptureRefs.join(", ")}</p>
        )}

        {song.alternateTitles?.length > 0 && (
          <p><strong>Alternate titles:</strong> {song.alternateTitles.join(", ")}</p>
        )}

        <p><strong>Songbook page:</strong> {printedSongPage}</p>
        <p><strong>PDF page:</strong> {pdfPage}</p>
      </div>

      <iframe
        src={`/songbook.pdf#page=${pdfPage}`}
        width="100%"
        height="900"
        style={{ border: "1px solid #ccc" }}
      />
    </main>
  )
}
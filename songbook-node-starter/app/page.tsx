import Link from "next/link"
import { getAllSongs } from "@/lib/songs"

export default function HomePage() {
  const songs = getAllSongs()
  const totalSongs = songs.length

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Pentecostal Songbook</h1>
      <p>Digital songbook reader with indexed song metadata.</p>

      <div style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}>
        <Link href="/search" style={{ marginRight: "1rem" }}>
          Search Songs
        </Link>
        <Link href="/reader">Open PDF Reader</Link>
      </div>

      <p><strong>Total songs indexed:</strong> {totalSongs}</p>

      <h2 style={{ marginTop: "2rem" }}>Quick Browse</h2>
      <ul style={{ columns: 2, paddingLeft: "1.2rem" }}>
        {songs.slice(0, 50).map((song) => (
          <li key={song.id} style={{ marginBottom: "0.4rem" }}>
            <Link href={`/songs/${song.id}`}>
              {song.number}. {song.title}
            </Link>
            {song.key ? ` — ${song.key}` : ""}
          </li>
        ))}
      </ul>

      <p style={{ marginTop: "1.5rem" }}>
        Showing first 50 songs here. Use search for the full index.
      </p>
    </main>
  )
}
import Link from "next/link"
import { searchSongs } from "@/lib/songs"

type Props = {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams
  const results = searchSongs(q)

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <Link href="/">← Home</Link>

      <h1 style={{ marginTop: "1rem" }}>Search Songs</h1>

      <form method="GET" style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by number, title, first line, key, scripture..."
          style={{ width: "360px", padding: "0.6rem" }}
        />
        <button
          type="submit"
          style={{ marginLeft: "0.5rem", padding: "0.6rem 1rem" }}
        >
          Search
        </button>
      </form>

      <p><strong>{results.length}</strong> result(s)</p>

      <ul style={{ paddingLeft: "1.2rem" }}>
        {results.map((song) => (
          <li key={song.id} style={{ marginBottom: "0.5rem" }}>
            <Link href={`/songs/${song.id}`}>
              {song.number}. {song.title}
            </Link>
            {song.key ? ` — ${song.key}` : ""}
            {song.pages?.[0] ? ` — Page ${song.pages[0]}` : ""}
          </li>
        ))}
      </ul>
    </main>
  )
}
import songs from "@/data/songs.json"
import type { Song } from "@/types/song"

export function getAllSongs(): Song[] {
  return (songs as Song[]).sort((a, b) => a.number - b.number)
}

export function getSongById(id: string): Song | undefined {
  return getAllSongs().find((song) => song.id === id)
}

export function searchSongs(query: string): Song[] {
  const q = query.trim().toLowerCase()

  if (!q) return getAllSongs()

  return getAllSongs().filter((song) => {
    const searchableValues = [
      String(song.number),
      song.title,
      song.firstLine,
      song.key,
      ...(song.scriptureRefs || []),
      ...(song.alternateTitles || []),
      ...(song.tags || [])
    ]

    return searchableValues
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(q))
  })
}
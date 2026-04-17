const fs = require("fs");
const path = require("path");
const { parseChordPro } = require("./chordpro");
const { slugifyText } = require("./slug");

const SONGS_DIR = path.join(__dirname, "..", "songs");
const LISTS_FILE = path.join(__dirname, "..", "songlists.json");

function ensureSongsDir() {
  if (!fs.existsSync(SONGS_DIR)) {
    fs.mkdirSync(SONGS_DIR, { recursive: true });
  }
}

function listSongFiles() {
  if (!fs.existsSync(SONGS_DIR)) {
    fs.mkdirSync(SONGS_DIR, { recursive: true });
  }
  return fs
    .readdirSync(SONGS_DIR)
    .filter((file) => file.toLowerCase().endsWith(".cho"))
    .sort();
}

function readSongFile(fileName) {
  const fullPath = path.join(SONGS_DIR, fileName);
  return fs.readFileSync(fullPath, "utf8");
}

function parseScriptures(value) {
  return String(value || "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function numericSongNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function buildSongRecord(fileName) {
  const content = readSongFile(fileName);
  const parsed = parseChordPro(content);
  const title = parsed.metadata.title || fileName.replace(/\.cho$/i, "");
  const id = slugifyText(title);

  return {
    id,
    title,
    songNumber: numericSongNumber(parsed.metadata.songnumber),
    key: parsed.metadata.key || "",
    categories: parsed.metadata.categories
      ? parsed.metadata.categories.split(",").map((v) => v.trim()).filter(Boolean)
      : [],
    scriptures: parseScriptures(parsed.metadata.scriptures),
    videoExample: parsed.metadata.video_example || parsed.metadata.video || "",
    fileName,
    parsed,
    raw: content
  };
}

function sortSongs(songs) {
  return [...songs].sort((a, b) => {
    if (a.songNumber != null && b.songNumber != null) return a.songNumber - b.songNumber;
    if (a.songNumber != null) return -1;
    if (b.songNumber != null) return 1;
    return a.title.localeCompare(b.title);
  });
}

function getAllSongs() {
  return sortSongs(listSongFiles().map(buildSongRecord));
}

function getSongById(id) {
  return getAllSongs().find((song) => song.id === id) || null;
}

function saveSongById(id, raw) {
  const safeId = slugifyText(id);
  if (!fs.existsSync(SONGS_DIR)) {
    fs.mkdirSync(SONGS_DIR, { recursive: true });
  }
  const fileName = `${safeId}.cho`;
  const fullPath = path.join(SONGS_DIR, fileName);
  fs.writeFileSync(fullPath, raw, "utf8");
  return buildSongRecord(fileName);
}

function searchSongs(query) {
  const q = String(query || "").trim().toLowerCase();
  const songs = getAllSongs();

  if (!q) {
    return songs.map(minifySong);
  }

  return songs
    .filter((song) => {
      const haystack = [
        song.title,
        song.songNumber,
        song.key,
        song.categories.join(" "),
        song.scriptures.join(" "),
        song.raw
      ]
        .join("\n")
        .toLowerCase();

      return haystack.includes(q);
    })
    .map(minifySong);
}

function minifySong(song) {
  return {
    id: song.id,
    title: song.title,
    songNumber: song.songNumber,
    key: song.key,
    categories: song.categories,
    scriptures: song.scriptures,
    videoExample: song.videoExample,
    fileName: song.fileName
  };
}

function exportSongsForSwiftUI() {
  return getAllSongs().map((song) => ({
    id: song.id,
    title: song.title,
    songNumber: song.songNumber,
    key: song.key,
    categories: song.categories,
    scriptures: song.scriptures,
    videoExample: song.videoExample || null,
    lyricsChordPro: song.raw
  }));
}

function buildAlphabeticalIndex() {
  return getAllSongs()
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((song) => ({
      letter: song.title.charAt(0).toUpperCase(),
      id: song.id,
      title: song.title,
      songNumber: song.songNumber
    }));
}

function buildScriptureIndex() {
  const map = new Map();
  for (const song of getAllSongs()) {
    for (const ref of song.scriptures) {
      if (!map.has(ref)) map.set(ref, []);
      map.get(ref).push({
        id: song.id,
        title: song.title,
        songNumber: song.songNumber
      });
    }
  }
  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([scripture, songs]) => ({ scripture, songs }));
}

function getSonglists() {
  if (!fs.existsSync(LISTS_FILE)) {
    return [];
  }

  const data = JSON.parse(fs.readFileSync(LISTS_FILE, "utf8"));
  return Array.isArray(data) ? data : [];
}

function getSonglistById(id) {
  return getSonglists().find((list) => list.id === id) || null;
}

module.exports = {
  SONGS_DIR,
  getAllSongs,
  getSongById,
  saveSongById,
  searchSongs,
  getSonglists,
  getSonglistById,
  minifySong,
  exportSongsForSwiftUI,
  buildAlphabeticalIndex,
  buildScriptureIndex
};

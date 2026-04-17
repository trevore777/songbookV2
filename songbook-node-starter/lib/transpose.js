const NOTES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const SHARP_TO_FLAT = {
  "C#": "Db",
  "D#": "Eb",
  "F#": "Gb",
  "G#": "Ab",
  "A#": "Bb"
};
const FLAT_TO_SHARP = {
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
  Bb: "A#"
};

function normalizeRoot(note) {
  return FLAT_TO_SHARP[note] || note;
}

function formatRoot(note, preferFlats = false) {
  if (preferFlats && SHARP_TO_FLAT[note]) {
    return SHARP_TO_FLAT[note];
  }
  return note;
}

function transposeRoot(note, semitones, preferFlats = false) {
  const normalized = normalizeRoot(note);
  const index = NOTES_SHARP.indexOf(normalized);

  if (index === -1) {
    return note;
  }

  const nextIndex = (index + semitones + 1200) % 12;
  return formatRoot(NOTES_SHARP[nextIndex], preferFlats);
}

function transposeSlashBass(chordSuffix, semitones, preferFlats = false) {
  return chordSuffix.replace(/\/([A-G](?:#|b)?)/g, (_m, bass) => {
    return `/${transposeRoot(bass, semitones, preferFlats)}`;
  });
}

function transposeChord(chord, semitones, preferFlats = false) {
  const match = chord.match(/^([A-G](?:#|b)?)(.*)$/);
  if (!match) {
    return chord;
  }

  const [, root, suffixRaw] = match;
  const newRoot = transposeRoot(root, semitones, preferFlats);
  const suffix = transposeSlashBass(suffixRaw, semitones, preferFlats);

  return `${newRoot}${suffix}`;
}

function transposeChordPro(text, semitones, preferFlats = false) {
  return text.replace(/\[([^\]]+)\]/g, (_match, chord) => {
    return `[${transposeChord(chord, semitones, preferFlats)}]`;
  });
}

module.exports = {
  transposeRoot,
  transposeChord,
  transposeChordPro
};

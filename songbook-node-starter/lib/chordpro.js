function parseDirective(line) {
  const match = line.match(/^\{([^:}]+)\s*:\s*(.*?)\}$/);
  if (!match) return null;

  return {
    name: match[1].trim().toLowerCase(),
    value: match[2].trim()
  };
}

function isSectionLabel(line) {
  return /^\[[^\]]+\]$/.test(line.trim());
}

function parseLineWithChords(line) {
  const parts = [];
  const regex = /\[([^\]]+)\]/g;
  let lastIndex = 0;
  let currentChord = null;
  let match;

  while ((match = regex.exec(line)) !== null) {
    const lyricText = line.slice(lastIndex, match.index);
    if (lyricText || currentChord) {
      parts.push({
        chord: currentChord,
        lyric: lyricText
      });
    }
    currentChord = match[1];
    lastIndex = regex.lastIndex;
  }

  const tail = line.slice(lastIndex);
  if (tail || currentChord) {
    parts.push({
      chord: currentChord,
      lyric: tail
    });
  }

  return parts;
}

function parseChordPro(text) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");

  const metadata = {};
  const sections = [];
  let currentSection = {
    name: "Song",
    lines: []
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (!line.trim()) {
      currentSection.lines.push({
        type: "blank",
        raw: ""
      });
      continue;
    }

    const directive = parseDirective(line);
    if (directive) {
      metadata[directive.name] = directive.value;
      continue;
    }

    if (isSectionLabel(line)) {
      if (currentSection.lines.length > 0 || currentSection.name !== "Song") {
        sections.push(currentSection);
      }
      currentSection = {
        name: line.replace(/^\[|\]$/g, ""),
        lines: []
      };
      continue;
    }

    currentSection.lines.push({
      type: "lyric",
      raw: line,
      parts: parseLineWithChords(line)
    });
  }

  if (currentSection.lines.length > 0 || currentSection.name !== "Song") {
    sections.push(currentSection);
  }

  return {
    metadata,
    sections,
    raw: text
  };
}

module.exports = {
  parseChordPro
};

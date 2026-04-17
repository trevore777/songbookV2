function stripDirectives(raw) {
  return String(raw || "")
    .split(/\r?\n/)
    .filter(line => !/^\{.*\}$/.test(line.trim()))
    .join("\n");
}

function extractMetadata(raw) {
  const metadata = {};
  const matches = String(raw || "").matchAll(/^\{([^:}]+)\s*:\s*(.*?)\}$/gm);

  for (const match of matches) {
    metadata[match[1].trim().toLowerCase()] = match[2].trim();
  }

  return metadata;
}

function leadSheetToLines(raw) {
  const noDirectives = stripDirectives(raw);

  const lines = noDirectives
    .split(/\r?\n/)
    .map(line => line.replace(/\t/g, "    "))
    .filter(line => line.trim().length > 0);

  return lines;
}

function chunkLines(lines, chunkSize = 4) {
  const chunks = [];

  for (let i = 0; i < lines.length; i += chunkSize) {
    chunks.push(lines.slice(i, i + chunkSize));
  }

  return chunks;
}

function renderSongForDisplay(raw, options = {}) {
  const metadata = extractMetadata(raw);
  const lines = leadSheetToLines(raw);

  const slides = chunkLines(lines, options.chunkSize || 4).map((chunk, index) => ({
    index,
    lines: chunk
  }));

  return {
    title: metadata.title || "",
    songNumber: metadata.songnumber || "",
    key: metadata.key || "",
    layout: metadata.layout || "",
    metadata,
    lines,
    slides
  };
}

module.exports = {
  stripDirectives,
  extractMetadata,
  leadSheetToLines,
  chunkLines,
  renderSongForDisplay
};

function extractMetadata(raw) {
  const metadata = {};
  const matches = String(raw || "").matchAll(/^\{([^:}]+)\s*:\s*(.*?)\}$/gm);

  for (const match of matches) {
    metadata[match[1].trim().toLowerCase()] = match[2].trim();
  }

  return metadata;
}

function leadSheetToLines(raw) {
  const noDirectives = stripDirectives(raw);

  return noDirectives
    .split(/\r?\n/)
    .map(line => line.replace(/\t/g, "    "))
    .filter(line => line.trim().length > 0);
}

function chunkLines(lines, chunkSize = 4) {
  const chunks = [];

  for (let i = 0; i < lines.length; i += chunkSize) {
    chunks.push(lines.slice(i, i + chunkSize));
  }

  return chunks;
}

function renderSongForDisplay(raw, options = {}) {
  const metadata = extractMetadata(raw);
  const lines = leadSheetToLines(raw);
  const slides = chunkLines(lines, options.chunkSize || 4).map((chunk, index) => ({
    index,
    lines: chunk
  }));

  return {
    title: metadata.title || "",
    songNumber: metadata.songnumber || "",
    key: metadata.key || "",
    layout: metadata.layout || "",
    metadata,
    lines,
    slides
  };
}

module.exports = {
  stripDirectives,
  extractMetadata,
  leadSheetToLines,
  chunkLines,
  renderSongForDisplay
};
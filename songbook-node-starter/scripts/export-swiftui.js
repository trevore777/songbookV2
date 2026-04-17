const fs = require("fs");
const path = require("path");
const {
  exportSongsForSwiftUI,
  buildAlphabeticalIndex,
  buildScriptureIndex
} = require("../lib/store");

const outputDir = path.join(__dirname, "..", "exports");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const data = {
  exportedAt: new Date().toISOString(),
  count: exportSongsForSwiftUI().length,
  songs: exportSongsForSwiftUI(),
  alphabeticalIndex: buildAlphabeticalIndex(),
  scriptureIndex: buildScriptureIndex()
};

const outputPath = path.join(outputDir, "swiftui-songs.json");
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf8");
console.log(`Exported ${data.count} songs to ${outputPath}`);

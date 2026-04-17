const express = require("express");
const path = require("path");

const songsRouter = require("./routes/songs");
const listsRouter = require("./routes/songlists");
const indexesRouter = require("./routes/indexes");
const serviceOrdersRouter = require("./routes/serviceOrders");
const remoteRouter = require("./routes/remote");
const pairingRouter = require("./routes/pairing");
const { searchSongs, exportSongsForSwiftUI } = require("./lib/store");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "2mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    app: "songbook-node-starter"
  });
});

app.get("/", (_req, res) => {
  res.json({
    name: "Songbook Node Starter",
    endpoints: [
      "/editor",
      "/projector/:id",
      "/song/:id",
      "/service-builder",
      "/service-projector/:id",
      "/live-preview/:id",
      "/remote/:id",
      "/pairing/remote/:id",
      "/songs",
      "/songlists",
      "/service-orders",
      "/remote-state/:id",
      "/indexes/alphabetical",
      "/indexes/scripture",
      "/exports/swiftui.json"
    ]
  });
});

app.get("/editor", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "editor.html"));
});

app.get("/projector/:id", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "projector.html"));
});

app.get("/song/:id", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "song-view.html"));
});

app.get("/service-builder", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "service-builder.html"));
});

app.get("/service-projector/:id", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "service-projector.html"));
});

app.get("/live-preview/:id", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "live-preview.html"));
});

app.get("/remote/:id", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "remote.html"));
});

app.get("/search", (req, res) => {
  const q = String(req.query.q || "").trim();
  const results = searchSongs(q);
  res.json({
    query: q,
    count: results.length,
    results
  });
});

app.get("/exports/swiftui.json", (_req, res) => {
  res.json({
    exportedAt: new Date().toISOString(),
    count: exportSongsForSwiftUI().length,
    songs: exportSongsForSwiftUI()
  });
});

app.use("/songs", songsRouter);
app.use("/songlists", listsRouter);
app.use("/indexes", indexesRouter);
app.use("/service-orders", serviceOrdersRouter);
app.use("/remote-state", remoteRouter);
app.use("/pairing", pairingRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
    path: req.path
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Songbook server running on http://localhost:${PORT}`);
});

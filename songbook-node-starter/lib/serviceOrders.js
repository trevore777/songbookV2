const fs = require("fs");
const path = require("path");
const { getAllSongs, getSongById, minifySong } = require("./store");
const { splitSlides } = require("./render");
const { transposeChordPro, transposeRoot } = require("./transpose");

const FILE = path.join(__dirname, "..", "service-orders.json");

function readOrders() {
  if (!fs.existsSync(FILE)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeOrders(orders) {
  fs.writeFileSync(FILE, JSON.stringify(orders, null, 2), "utf8");
}

function listOrders() {
  return readOrders();
}

function getOrderById(id) {
  return readOrders().find((o) => o.id === id) || null;
}

function saveOrder(id, payload) {
  const orders = readOrders();
  const index = orders.findIndex((o) => o.id === id);
  const cleanItems = Array.isArray(payload.items)
    ? payload.items.map((item, idx) => ({
        type: item.type === "custom" ? "custom" : "song",
        songId: item.songId || "",
        title: item.title || "",
        notes: item.notes || "",
        position: Number.isFinite(Number(item.position)) ? Number(item.position) : idx + 1,
        transpose: Number.isFinite(Number(item.transpose)) ? Number(item.transpose) : 0,
        musicianKeyOverride: item.musicianKeyOverride || ""
      }))
    : [];

  const order = {
    id,
    title: payload.title || id,
    date: payload.date || "",
    notes: payload.notes || "",
    items: cleanItems.sort((a, b) => a.position - b.position)
  };

  if (index >= 0) orders[index] = order;
  else orders.push(order);

  writeOrders(orders);
  return order;
}

function buildCustomSlides(item) {
  const lines = String(item.notes || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.length ? [{ title: item.title || "Item", lines }] : [];
}

function buildOrderView(id) {
  const order = getOrderById(id);
  if (!order) return null;

  const items = order.items.map((item) => {
    if (item.type === "custom") {
      return {
        ...item,
        slides: buildCustomSlides(item),
        musicianRaw: item.notes || ""
      };
    }

    const song = getSongById(item.songId);
    if (!song) {
      return {
        ...item,
        missing: true,
        slides: []
      };
    }

    const transpose = Number(item.transpose || 0);
    const projectorRaw = transpose !== 0 ? transposeChordPro(song.raw, transpose, false) : song.raw;
    const musicianRaw = item.musicianKeyOverride
      ? projectorRaw.replace(/^\{key:\s*([^}]+)\}$/m, `{key: ${item.musicianKeyOverride}}`)
      : projectorRaw;

    const baseKey = song.key || "";
    const projectorKey = baseKey ? transposeRoot(baseKey, transpose, false) : "";
    const musicianKey = item.musicianKeyOverride || projectorKey;

    return {
      ...item,
      title: item.title || song.title,
      songNumber: song.songNumber,
      originalKey: baseKey,
      projectorKey,
      musicianKey,
      scriptures: song.scriptures,
      song: minifySong(song),
      slides: splitSlides(projectorRaw),
      musicianRaw
    };
  });

  return {
    ...order,
    items
  };
}

function createSampleOrder() {
  const songs = getAllSongs().slice(0, 4);
  const existing = getOrderById("sample-sunday-service");
  if (existing) return existing;

  return saveOrder("sample-sunday-service", {
    title: "Sample Sunday Service",
    date: "",
    notes: "Starter service order",
    items: songs.map((song, i) => ({
      type: "song",
      songId: song.id,
      title: song.title,
      position: i + 1,
      transpose: 0,
      musicianKeyOverride: ""
    }))
  });
}

module.exports = {
  listOrders,
  getOrderById,
  saveOrder,
  buildOrderView,
  createSampleOrder
};

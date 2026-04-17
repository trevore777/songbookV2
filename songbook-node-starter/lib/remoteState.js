const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "..", "remote-state.json");

function readState() {
  if (!fs.existsSync(FILE)) {
    return {};
  }
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return {};
  }
}

function writeState(state) {
  fs.writeFileSync(FILE, JSON.stringify(state, null, 2), "utf8");
}

function getServiceState(serviceId) {
  const state = readState();
  return state[serviceId] || {
    itemIndex: 0,
    slideIndex: 0,
    updatedAt: new Date().toISOString()
  };
}

function setServiceState(serviceId, patch) {
  const state = readState();
  const current = state[serviceId] || {
    itemIndex: 0,
    slideIndex: 0
  };

  state[serviceId] = {
    ...current,
    ...patch,
    updatedAt: new Date().toISOString()
  };

  writeState(state);
  return state[serviceId];
}

module.exports = {
  getServiceState,
  setServiceState
};

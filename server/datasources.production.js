module.exports = {
  db : {
    name: "db",
    connector: "memory"
  },
  "uploads.avatar": {
    name: "uploads.avatar",
    connector: "loopback-component-storage",
    provider: "filesystem",
    root: "/var/data/files/avatar"
  }
};

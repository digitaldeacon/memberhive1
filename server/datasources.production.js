module.exports = {
  db: {
    name : "db",
    connector: "mongodb",
    host: "db",
    port: "27017",
    database: process.env.MH_DB_NAME,
    username: process.env.MH_DB_USER,
    password: process.env.MH_DB_PASSWORD,
  },
  "uploads.avatar": {
    name: "uploads.avatar",
    connector: "loopback-component-storage",
    provider: "filesystem",
    root: "/usr/local/files/avatar"
  }
};

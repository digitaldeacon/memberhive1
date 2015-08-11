module.exports = {
  db: {
    name : "db",
    connector: "mongodb",
    host: process.env.DB_PORT_27017_TCP_ADDR,
    port: process.env.DB_PORT_27017_TCP_PORT,
    database: process.env.MH_DB_NAME,
    username: process.env.MH_DB_USER,
    password: process.env.MH_DB_PASSWORD,
  },
  "uploads.avatar": {
    name: "uploads.avatar",
    connector: "loopback-component-storage",
    provider: "filesystem",
    root: "/var/data/files/avatar"
  }
};

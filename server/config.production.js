module.exports = {
  name : "db",
  connector: "mongodb",
  host: process.env.DB_PORT_27017_TCP_ADDR,
  port: process.env.DB_PORT_27017_TCP_PORT,
  database: process.env.MH_DB_NAME,
  username: "memberhive",
  password: process.env.MH_DB_PASSWORD
}; 

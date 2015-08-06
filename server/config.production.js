module.exports = {
  name : "db",
  connector: "mongodb",
  host: process.env.DB_PORT_27017_TCP_ADDR,
  port: process.env.DB_PORT_27017_TCP_PORT,
  database: "memberhive",
  username: "memberhive",
  password: "memberhive"
}; 

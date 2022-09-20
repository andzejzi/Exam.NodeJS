require("dotenv").config();

module.exports = {
  port: process.env.PORT || 8080,
  dbconfig: {
    host: process.env.DB_SQL_HOST,
    user: process.env.DB_SQL_USER,
    password: process.env.DB_SQL_PASSWORD,
    database: process.env.DB_SQL_DATABASE,
    port: process.env.DB_SQL_PORT,
  },
};

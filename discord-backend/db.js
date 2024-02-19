const mongoose = require("mongoose");

class Database {
  constructor() {
    this.connect();
  }
  connect() {
    const CONNECTION_STRING = process.env.DATABASE;
    mongoose
      .connect(CONNECTION_STRING)
      .then(() => console.log("DB Connected Successfully"))
      .catch((err) => console.log(err));
  }
}

module.exports = new Database();

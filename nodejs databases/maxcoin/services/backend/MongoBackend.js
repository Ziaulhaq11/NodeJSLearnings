/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
const { MongoClient } = require("mongodb");
const CoinAPI = require("../CoinAPI");

class MongoBackend {
  constructor() {
    this.coinAPI = new CoinAPI();
    this.mongoUrl = "mongodb://localhost:47017/maxcoin";
    this.client = null;
    this.collection = null;
  }

  async connect() {
    const mongoClient = new MongoClient(this.mongoUrl);
    this.client = await mongoClient.connect();
    this.collection = this.client.db("maxcoin").collection("values");
    return this.client;
  }

  async disconnect() {
    if (this.client) {
      return this.client.close();
    }
    return false;
  }

  async insert() {}

  async getMax() {}

  async max() {
    console.info("Connection to MongoDB");
    console.time("mongodb-connect");
    await this.connect()
      .then(() => {
        console.info("MongoDB Connected Successfully");
      })
      .catch(() => {
        throw new Error("Connection failed");
      });
    console.timeEnd("mongodb-connect");

    console.info("Disconnecting from MongoDB");
    console.time("mongodb-disconnect");
    await this.disconnect();
    console.timeEnd("mongodb-disconnect");
  }
}

module.exports = MongoBackend;

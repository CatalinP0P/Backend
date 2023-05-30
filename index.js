const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
require('dotenv').config();

const app = express();

const client = new MongoClient(process.env.MONGODB_ADRESS, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.log(err);
  }
}

run().catch(console.dir);

app.get("/get", async (req, res) => {
  const response = await client.db().collection("User").find({}).toArray();
  console.log(response);
  res.send(response);
});

app.post("/", async (req, res) => {
  const response = await client
    .db()
    .collection("User")
    .insertOne({ Name: "John" });
  res.send(response.insertedId);
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});

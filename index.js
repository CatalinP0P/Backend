const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");

const app = express();

const uri =
  "mongodb+srv://CatalinPCE:123@test.xxioyk1.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
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
  res.send("Da");
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

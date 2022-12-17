const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//dbUser: mernStack
//pass: ISBC3XVAXA4kkawm

const uri =
  "mongodb+srv://mernStack:ISBC3XVAXA4kkawm@cluster0.4r8e4ne.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const userCollection = client.db("mernStack").collection("users");
    const postCollection = client.db("mernStack").collection("posts");
    const commentCollection = client.db("mernStack").collection("comments");

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const userName = req.query.username;
      const password = req.query.password;
      const query = { userName: userName, password: password };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    app.post("/posts", async (req, res) => {
      const post = req.body;
      const result = await postCollection.insertOne(post);
      res.send(result);
    });

    app.get("/posts", async (req, res) => {
      const query = {};
      const result = await postCollection.find(query).toArray();
      res.send(result);

      app.post("/comments", async (req, res) => {
        const comment = req.body;
        const result = await commentCollection.insertOne(comment);
        res.send(result);
      });

      app.get("/comments", async (req, res) => {
        const query = {};
        const result = await commentCollection.find(query).toArray();
        res.send(result);
      });
    });
  } finally {
  }
}
run().catch(console.log);

app.get("/", (req, res) => {
  res.send("mern stact api is running");
});

app.listen(port, () => {
  console.log("mern stack api is running");
});

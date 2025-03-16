import express from "express";
import cors from "cors";
 import { db } from "./connect.js";
 
const app = express();
const PORT = 3001;
 
app.use(cors());


app.get("/", (reguest, response) => {
  response.send("Só vamos trabalhar com os endpoints '/artists' e '/songs'");
});
app.get("/artists", async (reguest, response) => {
  response.send(await db.collection("artists").find({}).toArray());
});

app.get("/songs", async (reguest, response) => {
  response.send(await db.collection("songs").find({}).toArray());
});

app.listen(PORT, () => {
  console.log(`Servidor está escultando na porta ${PORT}`);
});

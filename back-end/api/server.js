import express from "express";
import cors from "cors";
 import { db } from "./connect.js";
import path from "path";

const __dirname = path.resolve();
console.log( __dirname);
 
const app = express();
const PORT = 3001;
 
app.use(cors());


app.get("/api/", (reguest, response) => {
  response.send("Só vamos trabalhar com os endpoints '/artists' e '/songs'");
});
app.get("/api/artists", async (reguest, response) => {
  response.send(await db.collection("artists").find({}).toArray());
});

app.get("/api/songs", async (reguest, response) => {
  response.send(await db.collection("songs").find({}).toArray());
});

app.use(express.static(path.join( __dirname, "../front-end/dist")));

app.get("*", async (reguest, response) => {
  response.sendFile(path.join( __dirname, "../front-end/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor está escultando na porta ${PORT}`);
});

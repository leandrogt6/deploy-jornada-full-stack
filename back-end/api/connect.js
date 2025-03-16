import { MongoClient } from "mongodb";

const URI =
 "mongodb://leandrogataide:MGEQZx07BzEDJBua@cluster0-shard-00-00.spa6r.mongodb.net:27017,cluster0-shard-00-01.spa6r.mongodb.net:27017,cluster0-shard-00-02.spa6r.mongodb.net:27017/?replicaSet=atlas-n2m4yw-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

 const client = new MongoClient(URI);


 export const db = client.db("spotifyaula");



 
//console.log(songCollection);
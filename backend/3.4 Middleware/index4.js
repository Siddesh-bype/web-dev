import express from "express";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
var bandName;
function bandNameGenerator(req, res, next) {
  console.log("Generating band name...");
  bandName=req.body["street"]+req.body["pet"];
  next();
}
app.use(bandNameGenerator);

app.post("/submit", (req, res) => {
  res.send(`<h1>Your band name is:</h1><h2>${bandName}✌️</h2>`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

import express from 'express';
const app = express();
const port = 3000;

app.get("/",(req,res) => {
    console.log(req.rawHeaders);
  res.send("<h1>Hello, this is an Express HTTP request!</h1>");
});

app.get("/about",(req,res) => {
    res.send("<h1>This is the About page.</h1>");
});

app.get("/contact",(req,res) => {
    res.send("<h1>This is the Contact page.</h1>");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
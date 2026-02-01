import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;


const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "302006",
    port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;
    try {
        const checkresult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (checkresult.rows.length > 0) {
            res.status(409).send("Email already exists");
        } else {
            const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
            console.log(result);
            res.redirect("home.ejs");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/login", async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;
    try {
        const checkresult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (checkresult.rows.length === 0) {
            res.status(401).send("Invalid credentials");
        } else {
            const user = checkresult.rows[0];
            if (user.password === password) {
                res.redirect("home.ejs");
            } else {
                res.status(401).send("Invalid credentials");
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

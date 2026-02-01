//To see how the final website should work, run "node solution.js". 
//Make sure you have installed all the dependencies with "npm i".   
//The password is ILoveProgramming  
import express from 'express';   
import { dirname } from "path";
import { use } from 'react';
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));       

const app = express();
const PORT = 3000;
usercheck = false;

app.use(express.urlencoded({ extended: true }));

function passwordcheck(req, res, next) {
    const password = req.body.password;
    if (password === 'ILoveProgramming') {
        usercheck = true;
    } 
    next();
}

app.use(passwordcheck);

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/public' });
});

app.post('/check', (req, res) => {
    if (usercheck==true) {
        res.sendFile('secret.html', { root: __dirname + '/public' });
    } else {
        res.redirect('/');
    }
});
app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`);
});
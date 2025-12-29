import express from 'express';
// import ejs from 'ejs';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const today = new Date();
    let day = today.getDay();

    let type = 'a weekday';
    let adv="it's time to work hard";
    if (day === 6 || day === 0) {
        type = 'the weekend';
        adv="Enjoy your weekend!";
    }
    res.render('index.ejs', {datatype: type, advice: adv});
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    /* Pass your questions in here */
    {
      message: "Enter the URL you want to convert to a QR code:", 
    name: "url"
  }
  ])
  .then((answers) => {
    console.log(answers.url);
    const url = answers.url;
    var qr_svg = qr.image(url, { type: 'svg' });
    qr_svg.pipe(fs.createWriteStream('qrcode.svg'));
    fs.writeFile('user_input.txt', url, (err) => {
      if (err) throw err;
      console.log('The URL has been saved to user_input.txt!');
    });
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
 
// var svg_string = qr.imageSync('I love QR!', { type: 'svg' });
const sharp = require(`sharp`);
const fs = require(`fs`);

const input = `./original-images/no-sleeve-313.jpg`;

// const readBuffer = fs.readFile(input, (err, data) => {
//   if (err) console.log(err);
// });

// mobilenet input is 224x224
sharp(input)
  .resize({ width: 224, height: 224 })
  .toBuffer()
  .then((data) => {
    fs.writeFile(`./edited-images/output.jpg`, data, (err) => {
      if (err) console.log(err);
      console.log(`done?`);
    });
  });

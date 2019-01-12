const gm = require(`gm`);
const fs = require(`fs`);
const util = require(`util`);

const input = `${__dirname}/original-images/images/blouse-21.jpg`;
const imageFiles = require(`./original-images`).map(file => `./original-images/images/${file}`);

const writeToFile = (bufferedImage, imageName, callback) =>
  fs.writeFile(`./edited-images/${imageName}.jpg`, bufferedImage, (err) => {
    if (err) callback(`error from fs in writing image file`);
    else callback(null, console.log(`wrote ${imageName} to file`));
  });
const asyncWriteToFile = util.promisify(writeToFile);

gm(input)
  .resize(224, 224)
  .noise(`uniform`)
  .write(`./edited-images/gm-scale.jpg`, (err) => {
    if (err) console.log(err);
  });

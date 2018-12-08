const sharp = require(`sharp`);
const fs = require(`fs`);
const util = require(`util`);

const input = `./original-images/blouse-21.jpg`;
const imageFiles = require(`./original-images`).map(file => `./original-images/${file}`);

// Other augmentation: rotate image certain num of degrees in both directions,
// change color channel, gaussian noise/salt + pepper noise

const writeToFile = (bufferedImage, imageName, callback) =>
  fs.writeFile(`./edited-images/${imageName}.jpg`, bufferedImage, (err) => {
    if (err) callback(`error from fs in writing image file`);
    else callback(null, console.log(`wrote ${imageName} to file`));
  });

const asyncWriteToFile = util.promisify(writeToFile);

/* Data Augmentation */
const cropPipeline = async (image, imageName) => {
  let buffer;
  const imageToCrop = sharp(image);

  const topCrop = imageToCrop.resize(224, 224, { fit: `cover`, position: `top` });
  buffer = await topCrop.toBuffer();
  await asyncWriteToFile(buffer, `${imageName}-crop-top`);

  const bottomCrop = imageToCrop.resize(224, 224, { fit: `cover`, position: `bottom` });
  buffer = await bottomCrop.toBuffer();
  await asyncWriteToFile(buffer, `${imageName}-crop-bottom`);

  const centerCrop = imageToCrop.resize(224, 224, { fit: `cover`, position: `center` });
  buffer = await centerCrop.toBuffer();
  await asyncWriteToFile(buffer, `${imageName}-crop-center`);

  const contain = imageToCrop.resize(224, 224, {
    fit: `contain`,
    background: { r: 255, g: 255, b: 255 },
  });
  buffer = await contain.toBuffer();
  await asyncWriteToFile(buffer, `${imageName}-contain`);

  const mirror = contain.flop();
  buffer = await mirror.toBuffer();
  await asyncWriteToFile(buffer, `${imageName}-contain-mirror`);

  console.log(`done!`);
};

// cropPipeline(input);

/**
// Incase you don't want to fill with white (and figure out a better way of cropping rectangular tensors)

 const preserve = imageToCrop.resize(224, 224, { fit: `inside`, position: `center` });
  buffer = await preserve.toBuffer();
  await asyncWriteToFile(buffer, `preserve`);

  const mirror = preserve.flop();
  buffer = await mirror.toBuffer();
  await asyncWriteToFile(buffer, `mirror`);

* */

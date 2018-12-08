const fs = require(`fs`);
const path = require(`path`);

const folder = `${__dirname}/images`;

const files = fs.readdirSync(folder);

module.exports = files;

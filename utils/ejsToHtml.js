const ejs = require('ejs');
const fs = require('fs')
const path = require('path')
function ejsToHtml(originPath, targetPath, data) {
  const template = fs.readFileSync(originPath, { encoding: 'utf8' });
  let html = ejs.render(template, data);
  fs.writeFileSync(targetPath, html);
}

module.exports = {
  ejsToHtml
}
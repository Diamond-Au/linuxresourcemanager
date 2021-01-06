const ejs = require('ejs');
const fs = require('fs')
const path = require('path')
function ejsToHtml(originPath, targetPath) {
  const template = fs.readFileSync(originPath, {encoding:'utf8'});
  let html = ejs.render(template, {name:'zhangsan'});
  fs.writeFileSync(targetPath, html);
}

ejsToHtml(path.join(__dirname, '../template/index.ejs'), path.join(__dirname, '../template/index.html'))
const ejs = require('ejs');
function renderOsInfo(result) {
  result = JSON.stringify(result[0]);
  result = result.split(" ");
  osInfo = {};
  osInfo.type = result[0].replace("{", "");
  osInfo.version = result[2].split("-")[0];
  osInfo.gccInfo = result[6].replace(")", "");
  osInfo.host = result[5].replace("(", "");
  let template = `
        <div>
          <div class="os-info">
            <span>hostname:</span>
            <span class="title">${osInfo.host}</span>  
          </div>
          <div class="os-info">
            <span>type:</span>
            <span class="title">${osInfo.type}</span>  
          </div>
          <div class="os-info">
            <span>gccInfo:</span>
            <span class="title">${osInfo.gccInfo}</span>  
          </div>
          <div class="os-info">
            <span>OSversion:</span>
            <span class="title">${osInfo.version}</span>  
          </div>
        </div>
      `;
  return template
}


function renderCpuInfo(cpuInfoResult) {
  let template = `
  <div class="list">
    <% cpuInfoResult.forEach((item, index) => { %>
      <div class="list-item">
        <div>
          <span>apicid:</span>
          <span><%= item.apicid%></span>
        </div>
        <div>
          <span>cpu MHz:</span>
          <span><%= item['cpu MHz']%></span>
        </div>
        <div>
          <span>cpu cores:</span>
          <span><%= item['cpu cores']%></span>
        </div>
        <div>
          <span>model name:</span>
          <span><%= item['model name']%></span>
        </div>
        <div>
          <span>initial apicid:</span>
          <span><%= item['initial apicid']%></span>
        </div>
      </div>
    <% })%>
  <div>
  `
  template = ejs.render(template, { cpuInfoResult });
  return template;
}


module.exports = { renderOsInfo, renderCpuInfo }
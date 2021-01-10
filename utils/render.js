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
            <span>hostname:</span>
            <span class="title">${osInfo.host}</span>  
          </div>
          <div>
            <span>type:</span>
            <span class="title">${osInfo.type}</span>  
          </div>
          <div>
            <span>gccInfo:</span>
            <span class="title">${osInfo.gccInfo}</span>  
          </div>
          <div>
            <span>OSversion:</span>
            <span class="title">${osInfo.version}</span>  
          </div>
      `;
  return template
}


function renderCpuInfo(cpuInfoResult, length) {
  let template = `
        <div>
          <span>cpu MHz:</span>
          <span><%= cpuInfoResult['cpu MHz']%></span>
        </div>
        <div>
          <span>cpu cores:</span>
          <span><%= length%></span>
        </div>
        <div>
          <span>model name:</span>
          <span><%= cpuInfoResult['model name']%></span>
        </div>
        <div>
          <span> cache size</span
          <span><%= cpuInfoResult['cache size']%></span>
        <div>
  `
  template = ejs.render(template, { cpuInfoResult: cpuInfoResult[0], length });
  return template;
}



function renderProcessInfo(processInfo) {

  let template = `
    <div class="processinfo-box">
      <div class="header">
        <span class="name">NAME</span>
        <span class="pid">PID</span>
        <span class="state">STATE</span>
        <span class="memory">MEMORY</span>
        <span class="share-memeory-size">SHAREED MEMORY</span>
      </div>
      <div class="info-content">
        <% processInfo.forEach(item => {%>
          <div class="info-content-box" data-pid=<%= item.Pid %>>
            <span class="name"><%= item.Name%></span>
            <span class="pid"><%= item.Pid%></span>
            <span class="state"><%= item.State%></span>
            <span class="memory"><%= getMemory(item["VmRSS"])%></span>
            <span class="share-memeory-size"><%= getMemory(item["VmLib"])%></span>
          </div>
        <%}) %>
      </div>
    </div>
  `
  template = ejs.render(template, { processInfo, getMemory })
  return template;
}


/**
 * 
 * @description  format KBToMB
 */
function getMemory(item) {
  let memory = (parseInt(item) / 1024).toFixed(2);
  return isNaN(memory) ? '0MB' : memory + "MB";
}



function renderInnerMemoryInfo(MemoryInfo) {

  let keys = Object.keys(MemoryInfo)
  console.log(keys)
  let template = `
    <% keys.forEach(item => { %>
     <div>
      <span class="key"><%= item %></span>
      <span class="value"><%= MemoryInfo[item]%></span>
    </div>
    <% })%>
  `
  template = ejs.render(template, { MemoryInfo: MemoryInfo, keys: keys })
  return template
}


function renderDiskinfo(diskinfo) {
  let template = `
    <% for(let i=2; i< diskinfo.length;i++) { 
      item = diskinfo[i].split(" ").filter(str => str !== "");
    %>
      <div class="item">
        <span class="major"><%= item[0]%></span>
        <span class="minor"><%= item[1]%></span>
        <span class="block"><%= item[2]%></span>
        <span class="name"><%= item[3]%><span>
      </div>
    <% }%>
  `
  template = ejs.render(template, {diskinfo})
  return template
}


module.exports = { renderOsInfo, renderCpuInfo, renderProcessInfo, renderInnerMemoryInfo, renderDiskinfo }
const { Emitter } = require('../utils/events')
let MenuItems = [
  {
    label: '资源信息',
    click: function () {
      Emitter.emit('source')
    }
  },
  {
    label: '内存信息',
    click: function () {
      Emitter.emit('innerMemory')
    }
  },
  {
    label: '进程信息',
    click: function () {
      Emitter.emit('process')
    }
  },
  {
    label: '磁盘信息',
    click: function () {
      Emitter.emit('disk')
    }
  },
  {
    label: '系统信息',
    click: function () {
      Emitter.emit('information')
    }
  }
]

function getMemoryOrSawpOption(data) {
  return option = {
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: data.left, name: 'left', itemStyle: { color: "#2ed" } },
          { value: data.used, name: 'used', itemStyle: { color: "#f80" } },

        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
      }
    ]
  };



}

function getReceiveOrSendOption(data = 0, type) {
  let option = {

    series: [
      {
        name: 'type',
        type: 'gauge',
        min: 0,
        max: 10,
        z: 3,
        splitNumber: 10,
        data: [{ value: data, name: 'MiB' }],
        axisTick: {            // 坐标轴小标记
          length: 15,        // 属性length控制线长
          lineStyle: {       // 属性lineStyle控制线条样式
            color: 'auto'
          }
        },
        axisLine: {            // 坐标轴线
          lineStyle: {       // 属性lineStyle控制线条样式
            width: 10,
            color: [[0.5, "#4b4be4"], [1, "#e011d6"]] /// 
          }
        },
        axisLabel: {
          backgroundColor: '#343434',
          borderRadius: 2,
          color: '#f80',
          padding: 3,
          textShadowBlur: 2,
          textShadowOffsetX: 1,
          textShadowOffsetY: 1,
          textShadowColor: '#222'
        },
        splitLine: {           // 分隔线
          length: 20,         // 属性length控制线长
          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
            color: 'auto'
          }
        },
      }
    ],

  };
  return option;

}
module.exports = {
  MenuItems,
  getMemoryOrSawpOption,
  getReceiveOrSendOption
}
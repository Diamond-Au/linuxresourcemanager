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

function getSwapOpstion(data) {
  return option = {
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: data.left, name: 'left', color: "#00ff00" },
          { value: data.used, name: 'used', color: "#df4a16" },

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
  };;

}

module.exports = {
  MenuItems,
  getSwapOpstion
}
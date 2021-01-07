/**
 * @description 事件监听器 页面的切换 单例模式
 */
const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const Emitter = new MyEmitter();

module.exports = {
  Emitter
}

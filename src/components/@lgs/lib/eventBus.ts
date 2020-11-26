class EventBus {
  // 属性
  private bus: Record<string, Function[]> = {};
  // 构造单例
  private static instance: EventBus;
  private constructor() {}
  static defaultUtils() {
    if (!this.instance) {
      this.instance = new EventBus();
    }
    return this.instance;
  }

  // 监听
  public $on(event: string, handler: Function) {
    if (!this.bus[event]) {
      this.bus[event] = [];
    }
    this.bus[event].push(handler);
  }
  // 触发
  public $emit(event: string, ...args: any) {
    let handlers = this.bus[event];
    if (!handlers) return false;
    for (let handler of handlers) {
      handler.call(this, ...args);
    }
  }
  // 移除
  public $off(event: string, handler?: Function) {
    let handlers = this.bus[event];
    if (!handlers) return false;
    if (!handler) {
      delete this.bus[event];
    } else {
      handlers.forEach((item, index) => {
        if (item === handler) {
          handlers.splice(index, 1);
        }
      });
    }
  }
}

export default EventBus.defaultUtils();

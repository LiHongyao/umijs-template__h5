import { history } from 'umi';

class Utils {
  // 构造单例
  private static instance: Utils;
  private constructor() {}
  static defaultUtils() {
    if (!this.instance) {
      this.instance = new Utils();
    }
    return this.instance;
  }

  /**
   * 跳转/兼容http(s)、本地路由、scheme协议跳转
   * @param path
   */
  public static push(path: string, reg: RegExp = /^(ddou|https?)/) {
    if (reg.test(path)) {
      window.location.href = path;
    } else {
      history.push(path);
    }
  }
  /**
   * 跳转/兼容http(s)、本地路由、scheme协议跳转
   * @param path
   */
  public static replace(path: string, reg: RegExp = /^https?/) {
    if (reg.test(path)) {
      window.location.replace(path);
    } else {
      history.replace(path);
    }
  }
}
export default Utils;

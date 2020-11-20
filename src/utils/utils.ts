import { history } from 'umi';

/**
 * 类型声明
 *
 */
// 全局声明
declare global {
  interface Window {
    _hmt: any;
  }
}

// 百度统计
interface ITrackPv {
  type: 'pv';
  pageURL?: string /** 指定要统计PV的页面URL。此项必选，必须是以”/”（斜杠）开头的相对路径 */;
}
interface ITrackEs {
  type: 'es';
  category: string /** 要监控的目标的类型名称，通常是同一组目标的名字，比如”视频”、”音乐”、”软件”、”游戏”等等。该项必选 */;
  action?: string /** 用户跟目标交互的行为，如”播放”、”暂停”、”下载”等等。该项必选。 */;
  opt_label?: string /** 事件的一些额外信息，通常可以是歌曲的名称、软件的名称、链接的名称等等。该项可选。 */;
  opt_value?: string /** 事件的一些数值信息，比如权重、时长、价格等等，在报表中可以看到其平均值等数据。该项可选。 */;
}

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
   * 获取queryString参数值
   * @param name
   */
  public static query<T>(name?: string): T {
    let search = window.location.search;
    if (search) {
      let obj: Record<string, string> = {};
      search
        .slice(1)
        .split('&')
        .forEach(item => {
          let arr = item.split('=');
          obj[arr[0]] = decodeURIComponent(arr[1]);
        });
      let res: unknown = name ? (obj[name] ? obj[name] : '') : obj;
      return res as T;
    } else {
      let res: unknown = name ? '' : {};
      return res as T;
    }
  }
  /**
   * 处理日期格式
   * @param timeStamp  时间错
   * @param format 格式
   */
  public static dateFormat(timeStamp: number, format?: string) {
    function formatNumber(n: number | string) {
      n = n.toString();
      return n[1] ? n : '0' + n;
    }

    var date = new Date(timeStamp);
    var year = formatNumber(date.getFullYear());
    var month = formatNumber(date.getMonth() + 1);
    var day = formatNumber(date.getDate());

    var hour = formatNumber(date.getHours());
    var minute = formatNumber(date.getMinutes());
    var second = formatNumber(date.getSeconds());

    if (format) {
      return format
        .replace('yyyy', year)
        .replace('mm', month)
        .replace('dd', day)
        .replace('hh', hour)
        .replace('mm', minute)
        .replace('ss', second);
    }
    var res = '';
    res += year + '-' + month + '-' + day + ' ';
    res += hour + ':' + minute + ':' + second;
    return res;
  }
  /**
   * 删除数组中的指定元素
   * @param arr 数据源
   * @param id 键
   */
  public static del<T>(arr: T[], key: keyof T, value: any): T[] {
    let tmp = [...arr];
    let index = tmp.findIndex((item: T) => item[key] === value);
    tmp.splice(index, 1);
    return tmp;
  }

  /**
   * 手机号码格式
   * @param phone
   * @param format space
   */
  public static phoneFormatter(
    phone: string,
    format: 'space' | 'encryption' = 'encryption',
  ) {
    if (phone.length !== 11) {
      return '';
    } else if (format === 'space') {
      return phone.replace(/(\d{3})(\d{4})(\d{4})/, `$1 $2 $3`);
    } else {
      return phone.replace(/(\d{3})(\d{4})(\d{4})/, `$1****$3`);
    }
  }
  /**
   * px转vw
   * @param pixel
   */
  public static px2vw(pixel: number): string {
    return `${(pixel / 375) * 100}vw`;
  }
  /**
   * 复制内容至剪贴板
   */
  public static clipboard(value: string) {
    return new Promise((resolve, reject) => {
      let input = document.createElement('input');
      input.setAttribute('style', 'display: block; width: 1px; height: 1px;');
      input.setAttribute('readonly', 'readonly');
      input.setAttribute('value', value);
      document.body.appendChild(input);
      input.setSelectionRange(0, Infinity);
      input.select();
      let result = document.execCommand('copy');
      document.body.removeChild(input);
      if (result) {
        resolve();
      } else {
        reject();
      }
    });
  }

  /**
   * 时间倒计时（返回时分秒）
   * @param timeStamp 时间戳
   * @param format    返回格式 dd hh:mm:ss，不传则返回元组类型[天,时,分,秒]
   * @param pending   倒计时持续状态
   * @param complete  倒计时结束
   */
  public static timeDown(params: {
    timeStamp: number;
    format?: string;
    pending: (time: string | string[]) => void;
    complete: () => void;
  }) {
    function formatNumber(n: number | string) {
      n = n.toString();
      return n[1] ? n : '0' + n;
    }
    let { timeStamp, format, pending, complete } = params;
    if (timeStamp <= 0) {
      complete();
    } else {
      const tick = () => {
        timeStamp -= 1000;
        let day = formatNumber(Math.floor(timeStamp / 1000 / 60 / 60 / 24));
        let hours = formatNumber(Math.floor((timeStamp / 1000 / 60 / 60) % 24));
        let minutes = formatNumber(Math.floor((timeStamp / 1000 / 60) % 60));
        let seconds = formatNumber(Math.floor((timeStamp / 1000) % 60));
        let res: string | string[];
        if (format) {
          res = format
            .replace(/dd/gi, day)
            .replace(/hh/gi, hours)
            .replace(/mm/gi, minutes)
            .replace(/ss/gi, seconds);
        } else {
          res = [day, hours, minutes, seconds];
        }
        if (timeStamp <= 0) {
          clearInterval(timer);
          complete();
        } else {
          pending(res);
        }
      };
      tick();
      let timer = setInterval(tick, 1000);
      return timer;
    }
  }

  /**
   * 获取数据类型
   * @param target
   */
  public static toRawType(target: any) {
    return Object.prototype.toString
      .call(target)
      .slice(8, -1)
      .toLowerCase();
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
  public static replace(path: string, reg: RegExp = /^(ddou|https?)/) {
    if (reg.test(path)) {
      window.location.replace(path);
    } else {
      history.replace(path);
    }
  }

  /**
   * 百度统计
   * @param options
   */
  public static track(options: ITrackPv | ITrackEs) {
    if (window._hmt) {
      switch (options.type) {
        case 'pv':
          window._hmt.push([
            '_trackPageview',
            options.pageURL || location.pathname,
          ]);
          break;
        case 'es':
          window._hmt.push([
            '_trackEvent',
            options.category,
            options.action || 'click',
            options.opt_label,
            options.opt_value,
          ]);
          break;
      }
    }
  }
  /**
   * 随机字符
   * @param length
   * @param type
   */
  public static randomCharacters(
    length: number,
    type?: 'default' | 'uppercase' | 'lowercase' | 'digital',
  ) {
    type = type || 'default';
    var bStr = '';
    switch (type) {
      case 'digital':
        bStr += '0123456789';
        break;
      case 'uppercase':
        bStr += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        break;
      case 'lowercase':
        bStr += 'abcdefghijklmnopqrstuvwxyz';
        break;
      default:
        bStr += '0123456789';
        bStr += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        bStr += 'abcdefghijklmnopqrstuvwxyz';
    }
    var rStr = '';
    for (var i = 0; i < length; ++i) {
      var index = Math.floor(Math.random() * bStr.length);
      rStr += bStr.slice(index, index + 1);
    }
    return rStr;
  }
  /**
   * 获取指定范围内的随机数
   * @param min
   * @param max
   */
  public static randomDecimals(min: number, max: number) {
    // 异常处理
    if (min == undefined || max == undefined || isNaN(min) || isNaN(max)) {
      return -1;
    } else {
      return Math.random() * (max - min) + min;
    }
  }
  /**
   * 获取指定范围内的随机整数
   * @param min
   * @param max
   */
  public static randomInteger(min: number, max: number) {
    if (min == undefined || max == undefined || isNaN(min) || isNaN(max)) {
      return -1;
    } else {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
}
export default Utils;

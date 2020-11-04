import { history } from 'umi';

class Utils {
  // 构造单例
  private static instance: Utils;
  private constructor() { }
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
          res = format.replace(/dd/ig, day).replace(/hh/ig, hours).replace(/mm/ig, minutes).replace(/ss/ig, seconds);
        } else {
          res = [day, hours, minutes, seconds];
        }
        pending(res);
        if (timeStamp <= 0) {
          clearInterval(timer);
          complete();
        };
      };
      tick();
      let timer = setInterval(tick, 1000);
      return timer;
    }
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

}
export default Utils;

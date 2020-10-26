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
}
export default Utils;

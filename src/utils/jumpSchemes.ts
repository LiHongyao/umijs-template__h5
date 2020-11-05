// 项目开发中，需将 “ddou://www.d-dou.com” 协议修改为 项目的 scheme 协议;

const SCHEME = 'ddou://www.d-dou.com'
const SCHEME_PUSH = `${SCHEME}/push`;
const SCHEME_SWITCH = `${SCHEME}/switch`;
const SCHEME_BROWSER = `${SCHEME}/browser`;
const SCHEME_JUMP = `${SCHEME}/jump`;

// 二级目录地址 ==> “/umi-ddou-h5”
const PUBLIC_PATH = '';


interface PushParams {
  path: string,
  query?: Record<string, any>,
  needHeader?: 0 | 1,
  appBack?: 0 | 1
}

class jumpSchemes {
  // 构造单例
  private static instance: jumpSchemes;
  private constructor() { }
  static defaultUtils() {
    if (!this.instance) {
      this.instance = new jumpSchemes();
    }
    return this.instance;
  }
  /**
   * 跳转H5页面
   * @param params 
   */
  public static push(params: PushParams) {
    // 解构参数
    const { path, query, needHeader = 0, appBack = 1 } = params;
    // 处理url
    let url: string;
    // 如果连接以http开头，则直接赋值
    if (/^http/.test(path)) {
      url = path;
    } else {
      // 处理测试环境/生产环境二级路由
      if (process.env.NAME === 'development') {
        url = `${window.location.origin}${path}?needHeader=${needHeader}&appBack=${appBack}`;
      } else {
        url = `${window.location.origin}${PUBLIC_PATH}${path}?needHeader=${needHeader}&appBack=${appBack}`;
      }
      // 判断是否存在query参数，如果存在，则做拼接处理
      if (query) {
        for (let key in query) {
          url += `&${key}=${query[key]}`;
        }
      }
    }
    // 处理scheme地址
    let schemeHref = `${SCHEME_PUSH}?url=${encodeURIComponent(url)}`;
    // 执行跳转
    window.location.href = schemeHref;
  }
  /**
   * 跳转原生页面
   * @param path 
   */
  public static jump(path: string, params?: Record<string, any>) {
    // 拼接scheme
    let schemeHref = `${SCHEME_JUMP}${path}`;
    // 判断原生页面是否需要参数
    if (params) {
      schemeHref += '?'
      for (let key in params) {
        schemeHref += `${key}=${params[key]}&`
      }
      schemeHref = schemeHref.slice(0, -1);
    }
    window.location.href = schemeHref;
  }

  /**
   * 切换原生tab页
   * @param index 
   */
  public static switchTab(index: number) {
    window.location.href = `${SCHEME_SWITCH}?index=${index}`;
  }

  /**
   * 原生打开外部浏览器
   * @param {string} url 资源地址
   */
  public static jumpToBrowser(url: string) {
    window.location.href = `${SCHEME_BROWSER}?url=${encodeURIComponent(url)}`
  }


}
export default jumpSchemes;

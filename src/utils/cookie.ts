class Cookie {
  /**
   * 添加/修改cookie
   * @param {string} key 键
   * @param {string} value 值
   * @param {number} expireDays 过期时间
   */
  public static set(key: string, value: string | number, expireDays = 1) {
    document.cookie = `${key}=${encodeURIComponent(
      value,
    )};expires=${expireDays * 24 * 60 * 60 * 1000};path=/;`;
  }
  /**
   * 读取cookie
   * @param {string} key 键
   */
  public static get<T>(key?: string) {
    if (document.cookie) {
      const pairs = document.cookie.split(';');
      const result: Record<string, string> = {};
      pairs.forEach(str => {
        let arr = str.trim().split('=');
        let key = String(decodeURIComponent(arr[0]));
        let value = String(decodeURIComponent(arr[1]));
        result[key] = value;
      });
      let res: unknown = key ? (result[key] ? result[key] : '') : result;
      return res as T;
    } else {
      let res: unknown = key ? '' : {};
      return res as T;
    }
  }
  /**
   * 删除cookie
   * @param {string} key 键
   */
  public static del(key: string) {
    let _expires = new Date();
    _expires.setTime(_expires.getTime() - 1);
    const _value = Cookie.get(key);
    if (_value != null) {
      document.cookie = `${key}=${_value};expires=${_expires.toUTCString()};path=/`;
    }
  }
}

export default Cookie;

// Cookie.get();
// Cookie.get('token');
// Cookie.set('status', 1);
// Cookie.del('token');

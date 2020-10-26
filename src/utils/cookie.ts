class Cookie {
  /**
   * 添加/修改cookie
   * @param {string} key 键
   * @param {string} value 值
   * @param {number} expireDays 过期时间
   */
  public static set(key: string, value: string | number, expireDays = 1) {
    document.cookie = `${key}=${encodeURIComponent(value)};expires=${expireDays * 24 * 60 * 60 * 1000};path=/;`;
  }
  /**
   * 读取cookie
   * @param {string} key 键
   */
  public static get(key?: string) {
    if (document.cookie) {
      const _pairs = document.cookie.split(';');
      const _result: Record<string, string> = {};
      _pairs.forEach(str => {
        let _arr = str.trim().split('=');
        let _key = String(decodeURIComponent(_arr[0]));
        let _value = String(decodeURIComponent(_arr[1]));
        _result[_key] = _value;
      });
      return key ? (_result[key] ? _result[key] : null) : _result;
    }
    return null;
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
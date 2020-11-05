import Validator from './validator';

// 定义全局属性/方法
declare global {
  interface Window {
    webkit: any;
    js_android: any;
  }
}


interface MiniProgramOptions {
  userName: string;
  path: string;
  miniprogramType: 0 | 1 | 2;
}

interface PaymentParams {
  callback: string;
  payType: string;
  payStr: string;
  orderNo?: string;
}

interface ShareOptions {
  type: 0 | 1 | 2 | 3 | 4;
  title?: string;
  link?: string;
  text?: string;
  videoUrl?: string;
  imageUrl?: string;
  imageBase64?: string;
}


class jsBridge {
  private static call(fnName: string, data?: object) {
    if (Validator.ios()) {
      try {
        window.webkit.messageHandlers[fnName].postMessage(data ? JSON.stringify(data) : null);
      } catch (err) {
        console.log(err);
      }
    } else if (Validator.android()) {
      try {
        window.js_android[fnName](data ? JSON.stringify(data) : null);
      } catch (err) {
        console.log(err);
      }
    }
  }
  /**
   * 跳转微信小程序
   * @param {*} options
   * options.userName 小程序原始id
   * options.path 拉起小程序页面的可带参路径，不填默认拉起小程序首页
   * options.miniprogramType 打开类型；0：正式版，1：开发版，2：体验版
   */
  public static launchMiniProgram(options: MiniProgramOptions) {
    jsBridge.call('launchMiniProgram', options);
  }

  /**
   * 支付
   */
  public static payment(params: PaymentParams) {
    jsBridge.call('payment', params);
  }
  /**
   * 分享
   * @description 保存图片/视频的文案根据type决定
   * @param options 配置项
   * @param options.type          分享类型： 0 文字 / 1 图片 / 2 网页链接 / 3 视频连接 / 4 小程序
   * @param options.title         标题（可选）
   * @param options.link          网页链接（可选）
   * @param options.text          文字内容/网页链接描述（可选）
   * @param options.videoUrl      视频连接地址（可选）
   * @param options.imageUrl      图片链接地址/网页链接缩略图（可选）
   * @param options.imageBase64   图片base64（可选）
   */
  public static shareWith(options: ShareOptions) {
    jsBridge.call('shareWith', options);
  }

  /**
   * 百度统计
   * @param {*} eventId  事件id
   */
  public static baiduStatistics(eventId: string) {
    jsBridge.call('baiduStatistics', { eventId });
  }

  /**
   * 保存图片
   * @param images 图片集合 => 图片链接
   */
  public static saveImages(images: string[]) {
    jsBridge.call('saveImages', images);
  }
  /**
   * 保存视频
   * @param {string} videoUrl 视频地址
   */
  public static saveVideo(videoUrl: string) {
    jsBridge.call('saveVideo', { videoUrl });
  }

  /**
   * 绑定微信
   * @param cb
   */
  public static bindWeChat(callback: string) {
    jsBridge.call('bindWeChat', { callback });
  }
  /**
   * 打开微信
   */
  public static openWeChat() {
    jsBridge.call('openWeChat');
  }

  /**
   * 返回
   */
  public static goBack() {
    jsBridge.call('gobackAPP');
  }

  /**
   * 邀请购买vip
   * @param callback
   */
  public static inviteMembers(callback: string) {
    jsBridge.call('inviteMembers', { callback });
  }
}

export default jsBridge;

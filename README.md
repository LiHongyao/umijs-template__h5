# # 前言

为提升前端开发效率，减少不必要的配置项目环境的时间，特开发 `lg-umijs-cli` 脚手架供产研中心前端组的小伙伴使用。框架模板基于umijs + typescript 实现，内置常用的工具函数、api请求、dva、移动端适配、H5与原生交互、全局样式等功能。下面例举框架技术栈的一些参照地址，仅供参考：

- react：https://react.docschina.org/

- react/typescript 中文手册：https://typescript.bootcss.com/tutorials/react.html

- Ant-design：https://ant.design/index-cn
- Ant-mobile：https://mobile.ant.design/index-cn

- umijs：https://umijs.org/zh-CN
- Better-scroll：https://better-scroll.github.io/docs/zh-CN/guide/

# # 目录结构

```
.
├── build       # 执行 umi build 后，产物默认会存放在这里
├── mock        # 存储 mock 文件，此目录下所有 js 和 ts 文件会被解析为 mock 文件
├──  src        # 源码文件
    ├── .umi    # 临时文件目录
    ├── Api     # 接口请求
    ├── assets      # 静态资源
    ├── components  # 公共组件（页面级/项目级公共组件）
    		├── @lgs    # 公共组件（项目级）
    ├── constants
    		├── interface.d.ts # 全局TS类型定义
    ├── hooks       # 自定义hooks
    ├── models      # dva 
    ├── pages       # 路由组件
		    ├── IndexPage     # 页面
        	 ├── components # 页面级组件
        	 ├── images     # 页面级图片资源
           ├── index.less # 页面级样式（推荐使用less）
           └── index.tsx  # 页面级逻辑部分 
        └── 404           # 404页面
    ├── public            # 此目录下所有文件会被 copy 到输出路径
    ├── utils # 工具类
        ├── cookie.ts       # cookie 操作相关
        ├── jsBridge.ts     # H5 原生通信相关
        ├── jumpSchemes.ts  # H5 原生跳转协议相关
        ├── lgNumber.ts     # 数值运算库（解决js计算精度丢失问题）
        ├── utils.ts        # 工具函数相关
        └── validator.ts    # 正则验证相关
    ├── global.css          # 全局样式文件
    ├── global.ts           # 全局脚本部分
    └── app.ts              # 运行时配置文件，可以在这里扩展运行时的能力，比如修改路由、修改 render 方法等
├── .umirc.dev.ts   # 配置文件（开发环境）
├── .umirc.prod.ts  # 配置文件（生产环境）
├── .umirc.test.ts  # 配置文件（测试环境）
├── .umirc.ts       # 配置文件，包含 umi 内置功能和插件的配置
└── package.json  
```

> 提示：以上目录结构只例举关键部分，其他简单易懂后不值一提的目录在此省略。

# # 命名规范

- 组件命名必须使用大驼峰命名，如：IndexPage

- 路由命名使用小写字母，多个单词使用连字符（`-`）隔开，如：index-page

- 事件处理函数命名必须使用 `on` 关键字开头，如：onButtonTap

- 组件内部编码顺序按照如下标准编写：

  ````jsx
  import React, { FC, memo } from 'react'
  
  // 接口类型定义
  interface IProps {}
  // 静态变量定义
  const a = 10;
  
  const Test: FC<IProps> = (props) => {
    // 1. props：属性解构
    // 2. useState
    // 3. useRef
    // 4. method
    // 5. eventHandler
    // 6. useEffect
    // 7. render：渲染函数
    return (
      <div className="test"></div>
    )
  }
  // 提示：memo 用于组件，如果是页面级组件，则无需使用memo包裹。
  export default memo(Test);
  ````

# # 原生交互

## 1. scheme 跳转协议

scheme跳转协议为H5和原生之间的跳转协议，命名规范如下：

```
protocol://host
```

如，D豆定义的scheme协议为：`ddou://www.d-dou.com`，具体可参照此形式设计。

目前根据实际开发的场景定义如下跳转形式（示例以D豆为例）：

**a. 原生跳转H5页面：**

```
 ddou://www.d-dou.com/push?url=encodeURIComponent(url=xxx?needHeader=?&appBack=?)
```

示例解读：

- needHeader：是否需要原生实现导航栏，0为不需要，1为需要；
- appBack：点击导航栏上的返回按钮是否需要调用原生返回，0为不需要，1位需要。

**b. H5跳转原生页面：**

```
ddou://www.d-dou.com/jump/path?xxx=xxx
```

> 说明：`path` 为原生路由，`query` 参数为传递给原生的数据。在开发中，**原生开发者需拟定原生路由参照表供H5、后台及测试人员使用。**

**c. 切换tab页：**

```
ddou://www.d-dou.com/switch?index=x
```

> 说明：`index` 为原生tab栏上对应的下标，比如首页，`index`  值为 `0`。

**d. 原生打开外部浏览器：**

```
ddou://www.d-dou.com/browser?url=xxx
```

> 说明：`url` 为外部H5链接地址。

> 提示：关于scheme跳转协议，H5框架已封装，详情参考目录结构：“@/utils/jumpSchemes.ts”。

## 2. jsBridge

开发中，我们经常会通过方法和原生进行通信，比如分享、调用支付等等，这里例出js调用Android和iOS的示例代码：

```js
// js调用iOS
window.webkit.messageHandlers[fnName].postMessage(params ? JSON.stringify(params) : null);
// js调用Android
window.js_android[fnName](params ? JSON.stringify(params) : null);
```

> 说明：
>
> - `js_android` 为安卓开发者定义，为保持统一，安卓开发者将所有js调用方法定义在js_android对象上
> - `params` 为调用原生方法时传递的参数，对象类型（便于扩展和兼容），当无参数时传递 `null`。如果有参数，需转换为 JSON 字符串传递。

> 提示：和原生通信的方法，H5框架已封装，详情参考目录结构：“@/utils/jsBridge.ts”。
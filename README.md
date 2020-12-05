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
        ├── ...     # 其他组件（页面级）
    ├── constants
    		├── interface.d.ts # 全局TS类型定义
    ├── models      # dva 
    ├── pages       # 路由组件
		    ├── IndexPage     # 页面
        	 ├── components # 页面级组件
        	 ├── images     # 页面级图片资源
           ├── index.less # 页面级样式（推荐使用less）
           └── index.tsx  # 页面级逻辑部分 
        ├── 404           # 404页面
        └── document.ejs  # Html模板文件/可以引入百度统计或者CDN引入等操作
    ├── public            # 此目录下所有文件会被 copy 到输出路径
    ├── utils # 工具类
        ├── secret.ts       # 加密解密相关
        └── validator.ts    # 正则验证相关
    ├── app.ts              # 运行时配置文件，可以在这里扩展运行时的能力，比如修改路由、修改 render 方法等
    ├── global.css          # 全局样式文件
    ├── global.ts           # 全局脚本部分
    └── Loading.tsx         # 页面加载Loading
├── .env            # 配置文件（端口配置）
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
# # 公共库，项目已安装

- [lg-big：处理js浮点数计算精度问题](https://github.com/lihongyao/lg-big)
- [lg-classnames：class类名处理](https://github.com/lihongyao/lg-classnames)
- [lg-cookie：操作cookie](https://github.com/lihongyao/lg-cookie)
- [lg-react-hooks：常用react-hooks合集](https://github.com/lihongyao/lg-react-hooks)
- [lg-tools：工具函数](https://github.com/lihongyao/lg-tools)
- [lg-validator：正则验证工具](https://github.com/lihongyao/lg-validator)
- [lg-schemes：H5/原生跳转协议](https://github.com/LiHongyao/lg-schemes)

> 提示：以上工具库部分没有写使用指南，对于一些方法的时候，可以cmd 后者 ctr + 鼠标点击查看声明文件

# 快速入门

## 快速初始化项目
---
通过脚手架快速生成项目:
```
$ npm i egg-init -g
$ egg-init egg-example --type=simple
$ cd egg-example
$ npm i
```

启用项目：
```
$ npm run dev
$ open localhost:7001
```

## 编写 Controller
---
编写 Controller 和 Router

```js
// app/controller/home.js
module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      this.ctx.body = 'Hello world';
    }
  }
  return HomeController;
};
```

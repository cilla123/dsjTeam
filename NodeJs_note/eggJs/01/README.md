#快速入门

## 快速初始化项目
---
通过脚手架快速生成项目:
```
$ npm i egg-init -g
$ egg-init egg-example --type=simple
$ cd egg-example
$ npm i
```

## 启用项目：
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

此时目录结构如下：

```
egg-example
├── app
│   ├── controller
│   │   └── home.js
│   └── router.js
├── config
│   └── config.default.js
└── package.json
```

好，现在可以启动应用来体验下

```
$ npm run dev
$ open localhost:7001
```

## 静态资源

Egg 内置了 static 插件，线上环境建议部署到 CDN，无需该插件。

static 插件默认映射 /public/* -> app/public/* 目录

此处，我们把静态资源都放到 app/public 目录即可：

```
app/public
├── css
│   └── news.css
└── js
    ├── lib.js
    └── news.js

```

## 模板渲染

 ```
 $ npm i egg-view-nunjucks --save
 ```

## 开启插件：

 ```js
 // config/plugin.js
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
};
 ```

 ```js
 // config/config.default.js
config.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};
 ```

注意：是 config 目录，不是 app/config!
为列表页编写模板文件，一般放置在 app/view 目录下
```
<!-- app/view/news/list.tpl -->
<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    <div class="news-view view">
      {% for item in list %}
        <div class="item">
          <a href="{{ item.url }}">{{ item.title }}</a>
        </div>
      {% endfor %}
    </div>
  </body>
</html>
```

添加 Controller 和 Router

```js
// app/controller/news.js
module.exports = app => {
  class NewsController extends app.Controller {
    * list() {
      const dataList = {
        list: [
          { id: 1, title: 'this is news 1', url: '/news/1' },
          { id: 2, title: 'this is news 2', url: '/news/2' }
        ]
      };
      yield this.ctx.render('news/list.tpl', dataList);
    }
  }
  return NewsController;
};
// app/router.js
module.exports = app => {
  app.get('/', app.controller.home.index);
  app.get('/news', app.controller.news.list);
};
```
启动浏览器，访问 http://localhost:7001/news 即可看到渲染后的页面。

编写 service

在实际应用中，Controller 一般不会自己产出数据，也不会包含复杂的逻辑，复杂的过程应抽象为业务逻辑层 Service。

```js
// app/service/news.js
module.exports = app => {
  class NewsService extends app.Service {
    * list(page = 1) {
      // read config
      const { serverUrl, pageSize } = this.app.config.news;
      // use build-in http client to GET hacker-news api
      const { data: idList } = yield this.ctx.curl(`${serverUrl}/topstories.json`, {
        data: {
          orderBy: '"$key"',
          startAt: `"${pageSize * (page - 1)}"`,
          endAt: `"${pageSize * page - 1}"`,
        },
        dataType: 'json',
      });
      // parallel GET detail, see `yield {}` from co
      const newsList = yield Object.keys(idList).map(key => {
        const url = `${serverUrl}/item/${idList[key]}.json`;
        return this.ctx.curl(url, { dataType: 'json' });
      });
      return newsList.map(res => res.data);
    }
  }
  return NewsService;
};
```
框架提供了内置的 HttpClient 来方便开发者使用 HTTP 请求。

然后稍微修改下之前的 Controller：

```js
// app/controller/news.js
module.exports = app => {
  class NewsController extends app.Controller {
    * list() {
      const ctx = this.ctx;
      const page = ctx.query.page || 1;
      const newsList = yield ctx.service.news.list(page);
      yield ctx.render('news/list.tpl', { list: newsList });
    }
  }
  return NewsController;
};
```

还需增加 app/service/news.js 中读取到的配置：

```js
// config/config.default.js
exports.news = {
  pageSize: 5,
  serverUrl: 'https://hacker-news.firebaseio.com/v0',
};

```

编写扩展

遇到一个小问题，我们的资讯时间的数据是 UnixTime 格式的，我们希望显示为便于阅读的格式。
框架提供了一种快速扩展的方式，只需在 app/extend 目录下提供扩展脚本即可，具体参见扩展。
在这里，我们可以使用 View 插件支持的 Helper 来实现：

```js
// app/extend/helper.js
const moment = require('moment');
exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();
```

在模板里面使用：

```
<!-- app/views/news/list.tpl -->
{{ helper.relativeTime(item.time) }}

```

































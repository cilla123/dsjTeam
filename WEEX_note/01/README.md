# 搭建环境

---

## 第一步：安装Node

## 第二步：安装weex-toolkit

```
    $ npm install -g weex-toolkit
    $ weex -v
    v1.0.3
    weex-builder : v0.2.4
    weex-previewer : v1.3.4
```

## 第三步：初始化项目

```
$ weex init awesome-project
```

## 第四步： 开发

之后我们进入项目所在路径，weex-toolkit 已经为我们生成了标准项目结构。

在 package.json 中，已经配置好了几个常用的 npm script，分别是：
    - build: 源码打包，生成 JS Bundle
    - dev: webpack watch 模式，方便开发
    - serve: 开启静态服务器
    - debug: 调试模式

我们先通过 npm install 安装项目依赖。之后运行 npm run dev 和 npm run serve 开启watch 模式和静态服务器。
然后我们打开浏览器，进入 http://localhost:8080/index.html 即可看到 weex h5 页面。
初始化时已经为我们创建了基本的示例，我们可以在 src/foo.vue 中查看。

代码如下所示

```vue
<template>
  <div class="wrapper">
    <text class="weex">Hello Weex !</text>
    <text class="vue">Hello Vue !</text>
  </div>
</template>
<style scoped>
  .wrapper {
    flex-direction: column;
    justify-content: center;
  }
  .weex {
   font-size: 60px;
   text-align: center;
   color: #1B90F7;
  }
  .vue {
   font-size: 60px;
   text-align: center;
   margin-top: 30px;
   color: #41B883;
  }
</style>
```


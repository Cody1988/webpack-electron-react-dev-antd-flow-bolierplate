# 说明

这里介绍一个`electron`应用开发的`bolierplate`，使用此模板项目可以快速的进行PC端跨平台app的开发，打包等工作。这个模板项目集成了`electron`，`React`，`Dva`，`flow`，`antd`这几项技术。

# electron

`electron`是`Github`开源的一个开发PC端跨平台应用程序开发框架，此框架得到非常广泛的应用，比如我每天都在使用的`visual studio code`就是使用它开发的。其它使用`electron`开发的APP，可以在[官网](https://electronjs.org/)中查看。

# React

最近几年前端的发展可谓相当的迅速，其中17年的需求量尤其强大，很多朋友的团队都组件了独立的前端开发项目组，而前端最炙手可热的框架莫过于`React`，`Vue`，`Angular`；我们的团队在项目中广泛的使用了`React`和`Vue`。从开发效率上来说，两者基本上可以达到相似的速度，因为社区有开源的`electron-vue`项目，可以使用，这里就自己动手搭建一个`electron`+`React`的模板项目。

`React`的开发，离不开全家桶，其中包括`Redux`,`Router`,`axios`等等；但是在这里我们并不会直接使用这些，因为从业务层的角度来说，`Redux`的`action`与数据获取的`service`有太多的耦合了，而且再次过程中我们需要不断的定义各种字符串常亮，在经过调研之后发现阿里巴巴的开源项目[dva](https://github.com/dvajs/dva)很好的解决了这些问题。能够真正的达到各层开发者可以专心的开发各自的业务，非常好的解耦代码。

# flow

`flow`是Facebook开源的`javascript`的静态类型检测框架，相关介绍以及集成可以看另一篇博客[React中集成flow
](http://blog.wuyaoyao.xyz/2018/05/08/React%E4%B8%AD%E9%9B%86%E6%88%90flow/#more)

# antd

`antd`是阿里巴巴开源的一个前端设计语言的`React`实现。具体可以参照[官方文档](https://ant.design/docs/react/introduce-cn)

# webpack

现在前端开发几乎无法避免的要接触`webpack`，那么我们这个模板项目就是通过`webpack`来集成各个技术模块的，在`dev`模式下，`electron`启动的时候会加载`http`页面，而发布模式下，因为网页是随着页面一起打包的，我们会加载当前目录下的主页地址。

```
if (isDebug) {
    // when debug , we load http://localhost:port
    const port = process.env.PORT || 10240;
    win.loadURL(`http://localhost:${port}`);
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }
```
在`config`目录下有几个`webpack.*.js`文件，其最主要的功能就是编译转化`React`以及其他前端相关内容，然后通过`package.js`中的启动脚本来完成`electron`与`React`的集成。

[模板项目传送门](https://github.com/Cody1988/webpack-electron-react-dev-antd-flow-bolierplate)
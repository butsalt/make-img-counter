# make-img-counter

切好0-9对应的图片，一行命令生成定制的记分板组件

## 使用方法
1. `npm install -g make-img-counter`
2. 创建一个文件夹，比如叫`test`
3. 在`test`文件夹内创建一个文件夹`src`
4. 在`test/src`文件夹内放入你已经切好的0-9的图片（宽高必须一致）
5. 在`test`目录下执行`make-img-counter`
6. 在`test/dist`下获取产出物，包括`js`，`css`和`img`

## api
```html
<div id="J-counter"></div>
```

```javascript
// 需要引入产出的css和js文件
// js支持amd，没有amd环境时暴露到全局的makeImgCounter这个变量上
// 参数1：记分板容器（必要）
// 参数2：初始化分数（默认为0）
// 参数3：积分板最高位数（默认为1）
// 参数4：从上向下翻 || 从下向上翻（默认为从上向下翻） 
var counter = makeImgCounter(
  document.getElementById('J-counter'),
  123,
  3,
  'increment' || 'decrement'
);

// 更新计分板上的数字
counter.update(321);
```
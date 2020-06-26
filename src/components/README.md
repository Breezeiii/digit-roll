### digit-roll

轻巧的数字滑动组件，巧妙的运用css3和vue特性完成动画效果。

### 安装

```js
npm i digit-roll；

import DigitRoll from "digit-roll";
Vue.use(DigitRoll, { /* options全局默认参数 见props */});
```

### props

```js
// v-model
value: {
    type: Number,
    default: 0,
},
// 持续时间
duration: {
    type: Number,
    default: 1000,
},
// 延迟时间 默认不延迟
delay: {
    type: Number,
    default: 0,
},
// 滑动方式
easing: {
    type: String,
    default: "linear",
},
// 格式化
format: {
    type: String,
    default: '(,ddd).dd',
},
// 取整函数 默认四舍五入
math: {
    // ceil:向上取整 floor:向下取整 round:四舍五入
    type: String,
    default: "round",
},
```

### demo

https://liuhaifengzzzzz.github.io/digit-roll

```vue
<digit-roll
    v-model="1111"
    :duration="1000"
    :delay="1000"
    >
</digit-roll>
```


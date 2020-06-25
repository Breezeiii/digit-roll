### number-roll

数字滚动组件，轻量级。

### props

```j s
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

https://liuhaifengzzzzz.github.io/number-roll

```vue
<number-roll
    v-model="1111"
    :duration="1000"
    :delay="1000"
    >
</number-roll>
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

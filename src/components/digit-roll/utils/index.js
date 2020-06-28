export default class {
  constructor() {}

  // 防抖动
  static debounce(fn, delay = 200) {
    let timer = null;
    return function() {
      let context = this;
      let args = arguments;

      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    };
  }
}

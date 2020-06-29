<template>
  <span
    class="dr"
    :style="{
      transitionDuration: getTime(duration),
      transitionDelay: getTime(delay),
      transitionTimingFunction: easing,
    }"
  >
    <template v-for="(item, index) in valueFormat">
      <span
        :key="index"
        :class="[
          'dr-element',
          /\d+/.test(item)
            ? 'dr-digit'
            : item == '.'
            ? 'dr-radix-mark'
            : 'dr-formatting-mark',
        ]"
      >
        <span class="dr-spacer">
          {{ item }}
        </span>
        <template v-if="/\d+/.test(item)">
          <span
            class="dr-roll"
            :style="{
              transform: state
                ? 'translateY(' + -item * 10 + '%' + ')'
                : 'translteY(0)',
            }"
          >
            <span
              class="dr-roll-element"
              v-for="(_item, _index) in 10"
              :key="_index"
            >
              {{ _index }}
            </span>
          </span>
        </template>
      </span>
    </template>
  </span>
</template>

<script>
import _ from "./utils";

let DIGIT_FORMAT = "(,ddd).dd";
let FORMAT_PARSER = /^\(?([^)]*)\)?(?:(.)(d+))?$/;

export default {
  name: "digit-roll",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 1000,
    },
    delay: {
      type: Number,
      default: 0,
    },
    easing: {
      type: String,
      default: "linear",
    },
    format: {
      type: String,
      default: DIGIT_FORMAT,
    },
    math: {
      // 小数位取整函数
      // ceil:向上取整 floor:向下取整 round:四舍五入
      type: String,
      default: "round",
    },
  },
  computed: {
    resetFormat() {
      let f = FORMAT_PARSER.exec(this.format).slice(1);

      return {
        repeating: f[0],
        radix: f[1],
        precision: f[2].length,
      };
    },
    valueFormat() {
      const WFLAG = true;
      let repeating = this.resetFormat.repeating;
      let radixFlag = false;
      let _arr = [];

      this.createRound(this.math)(this.value, this.resetFormat.precision)
        .toString()
        .split("")
        .reverse()
        .forEach((item) => {
          let flag = false;

          if (item == ".") {
            radixFlag = true;
            _arr.unshift(item);
          } else {
            if (radixFlag) {
              flag = false;

              while (WFLAG) {
                if (!repeating.length) {
                  if (flag) {
                    throw new Error("Bad odometer format without digits");
                  }
                  repeating = this.resetFormat.repeating;
                  flag = true;
                }

                let chr = repeating[repeating.length - 1];
                repeating = repeating.substring(0, repeating.length - 1);

                if (chr === "d") {
                  break;
                }

                _arr.unshift(chr);
              }
            }

            _arr.unshift(item);
          }
        });

      return _arr;
    },
  },
  watch: {
    // 维护state，初始、新生成的dom有动画
    valueFormat: {
      handler(nVal, oVal) {
        this.state = false;
        _.debounce(() => {
          this.state = true;
        }, 0)();
      },
      immediate: true,
    },
  },
  data() {
    return {
      state: false,
    };
  },
  mounted() {},
  methods: {
    getTime(time) {
      return time ? `${parseFloat(time / 1000)}s` : time;
    },
    createRound(methodName) {
      let func = Math[methodName];
      return function(number, precision) {
        precision = precision == null ? 0 : Math.min(precision, 292);
        if (precision && number) {
          let pair = (String(number) + "e").split("e"),
            value = func(pair[0] + "e" + (+pair[1] + precision));

          pair = (String(value) + "e").split("e");
          return +(pair[0] + "e" + (+pair[1] - precision));
        }
        return func(number);
      };
    },
  },
};
</script>

<style scoped>
@import url("./style/index.css");
</style>

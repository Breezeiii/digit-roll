let PREFIX = "dr";
let DIGIT_FORMAT = "(,ddd).dd";
let FORMAT_PARSER = /^\(?([^)]*)\)?(?:(.)(d+))?$/;

var DigitRoll = {
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
  data() {
    return {};
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
  render() {
    const REGEXP = /\d+/;
    let scrollItem = [];
    for (var i = 0; i < 10; i++) {
      scrollItem.push(<span class={PREFIX + "-scroll-item"}> {i} </span>);
    }

    return (
      <span class={PREFIX}>
        {this.valueFormat.map((item) => {
          return (
            <span class={PREFIX + "-item"}>
              <span
                class={
                  REGEXP.test(item)
                    ? PREFIX + "-spacer"
                    : item == "."
                    ? PREFIX + "-radix-mark"
                    : PREFIX + "formatting-mark"
                }
              >
                {item}
              </span>
              {REGEXP.test(item) ? (
                <span
                  class={PREFIX + "-scroll"}
                  style={{
                    transform: "translateY(" + -item * 10 + "%)",
                    transitionDuration: this.getTime(this.duration),
                    transitionDelay: this.getTime(this.delay),
                    transitionTimingFunction: this.easing,
                  }}
                >
                  {scrollItem}
                </span>
              ) : null}
            </span>
          );
        })}
      </span>
    );
  },
};

DigitRoll.install = function(Vue) {
  Vue.component(DigitRoll.name, DigitRoll);
};

export default DigitRoll;

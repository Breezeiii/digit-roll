import "./style";
import DigitRoll from "./index.jsx";

var install = function(Vue) {
  Vue.use(DigitRoll);
};

export { DigitRoll };

export default {
  version: "1.0.0",
  install: install,
};

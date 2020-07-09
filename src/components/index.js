import DigitRoll from "./digit-roll";

export default {
  install: (Vue, options = {}) => {
    for (var key in DigitRoll.props) {
      options[key] && (DigitRoll.props[key].default = options[key]);
    }

    Vue.component(DigitRoll.name, DigitRoll);
  },
};

export { DigitRoll };

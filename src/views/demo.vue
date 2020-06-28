<template>
  <div class="demo">
    <h3>数字滚动 demo</h3>
    <div>
      <template v-for="(item, key) in $data">
        <div :class="['demo-item', key]" :key="key">
          <digit-roll
            v-model="$data[key].value"
            :duration="$data[key].duration"
            :delay="$data[key].delay"
          >
          </digit-roll>
          <span class="unit">
            {{ $data[key].unit }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo",
  data() {
    return {
      num1: {
        value: 1,
        duration: 200,
        // delay: 200,
      },
      num2: {
        value: 22,
        duration: 400,
        delay: 400,
      },
      num3: {
        value: 333,
        duration: 600,
        delay: 600,
      },
      num4: {
        value: 4444.444,
        duration: 800,
        delay: 200,
      },
      num5: {
        value: 55555.555,
        duration: 1000,
        unit: "个",
      },
      num6: {
        value: 666666.666,
        duration: 1200,
        unit: "人",
      },
      num7: {
        value: 7777777,
        duration: 1400,
        unit: "幢",
      },
      num8: {
        value: 88888888,
        duration: 1600,
        // unit: "¥",
      },
    };
  },
  mounted() {
    var flag = true;
    if (flag) {
      setInterval(() => {
        for (var i in this.$data) {
          var num = Math.random();
          var count = Number((num * 100).toFixed(2));
          num > 0.5
            ? (this.$data[i].value += count)
            : (this.$data[i].value -= count);
        }
      }, 5000);
    }
  },
};
</script>

<style scoped lang="scss">
$base-ft: 16px;
$radix: 6px;

.demo {
  // width: 600px;
  padding-left: 100px;

  .demo-item {
    margin-bottom: 30px;
    font-size: 20px;
    // display: table;

    .unit {
      vertical-align: middle;
      display: inline-block;
    }

    $colors: blue, #000, green, #f00, gray, #444, #faf, #ffffff;

    @for $i from 1 through 8 {
      &:nth-child(#{$i}) {
        $ft: $base-ft + $radix * ($i - 1);
        font-size: $ft;
        color: nth($colors, $i);

        .unit {
          font-size: $ft/2;
        }
      }
    }

    &.num8 {
      ::v-deep {
        .dr-spacer {
          background-color: #0452ee;
          margin: 0 4px;
          padding: 0 6px;
          border-radius: 4px;
        }
        .dr-radix-mark,
        .dr-formatting-mark {
          color: #0452ee;
        }
      }
    }
  }
}
h3 {
  text-align: center;
}
</style>

<template>
  <div>

  </div>
</template>
<script lang="ts">
import Vue from "vue";
function deepClone(target: any): any {
  let result: any;
  // 定义一个变量
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === "object") {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = []; // 将result赋值为一个数组，并且执行遍历
      for (const i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]));
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null;
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target;
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {};
      for (const i in target) {
        result[i] = deepClone(target[i]);
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target;
  }
  // 返回最终结果
  return result;
}
const aa = () => {
  console.log(1);
};
const dd = () => {
  console.log(1);
};
const obj = {
  bb: 1,
  aa: dd
};
export default Vue.extend({
  data() {
    return {};
  },
  created() {
    console.log("created");
    const cc = deepClone(obj);
    cc.aa();
  },
  methods: {}
});
</script>
<style lang="scss">
// @import url("../styles/mixins2.scss");
div {
  @include test;
}
</style>
<template>
  <div class="md-container">
    <img src="@/assets/logo.png"
         alt="">
    <div v-html="mdTest1"></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import md2html from "@/utils/md2html";
import mdTest1 from "./mdFiles/test1.md";
export default Vue.extend({
  data() {
    return {
      mdTest1: ""
    };
  },
  created() {
    this.mdTest1 = md2html(mdTest1);
  },
  methods: {}
});
</script>
<style lang="scss" scoped>
.md-container {
  text-align: left;
}
</style>
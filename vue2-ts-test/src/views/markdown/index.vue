<template>
  <div v-html="readme"></div>
</template>
<script lang="ts">
import Vue from "vue";
import md2html from "@/utils/md2html";
import * as readme from "../../../README.md";
export default Vue.extend({
  data() {
    return {
      readme: ""
    };
  },
  created() {
    this.readme = md2html(readme);
  },
  methods: {}
});
</script>
<style scoped="true"></style>
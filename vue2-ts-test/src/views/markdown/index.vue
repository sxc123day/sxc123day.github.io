<template>
  <div v-html="readme"></div>
</template>
<script lang="ts">
import * as readme from "../../../README.md";
export default {
  data() {
    return {
      readme: ""
    };
  },
  created() {
    this.readme = this.md2html(readme);
  },
  components: {}
};
</script>
<style scoped="true"></style>
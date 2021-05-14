<template>
  <async-component path="components/Hello World"></async-component>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  components: {
    AsyncComponent: (): any => import("./AsyncComponent.vue")
  }
});
</script>
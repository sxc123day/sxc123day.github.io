<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="/about/1">About1</router-link>
    <router-link to="/about/2">About2</router-link>
    <router-link to="/">home</router-link>
    <router-link to="/test">test</router-link>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";

@Component({
  components: {},
  data() {
    return {};
  },
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate");
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave");
    next();
  },
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    next();
  }
})
export default class About extends Vue {
  @Watch("$route")
  private onRouteChanged(to: Route, from: Route) {
    console.log(to, from);
  }
}
</script>

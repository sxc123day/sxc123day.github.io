<template>
  <component v-bind:is="componentFile"></component>
</template>
 
<script>
export default {
  props: {
    path: {
      type: String,
      required: true,
      default: () => null
    }
  },
  data () {
    const componentFile = this.render;
    return {
      componentFile: componentFile
    }
  },
  methods: {
    render () {
      this.componentFile = (resolve) => ({
        component: import(`@/${this.path}`),
        loading: { template: '<div style="height: 100%; width: 100%; display: table;"><div style="display: table-cell; vertical-align: middle; text-align: center;"><div>加载中</div></div></div>' },
        error: { template: '<div style="height: 100%; width: 100%; display: table;"><div style="display: table-cell; vertical-align: middle; text-align: center;"><div>加载错误</div></div></div>' },
        delay: 3000,
        timeout: 10000
      });
    }
  },
  watch: {
    file () {
      this.render();
    }
  }
}
</script>

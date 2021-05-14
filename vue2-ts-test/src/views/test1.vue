<template>
  <div class="computeds">
    <p>{{aaa}}</p>
    <el-button @click='addList(Math.random())'>addList</el-button>
    <el-button @click='addUser(Math.random())'>addUser</el-button>
    <ul>
      <li v-for="item,index in list"
          :key='index'>
        <input type="text"
               v-model="item.value"
               @input="consolelog">
      </li>
    </ul>
    <ul>
      <li v-for="item,index in userList"
          :key='index'>
        <input type="text"
               v-model="item.value"
               @input="consolelog">
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Mutation, namespace } from "vuex-class";

const userStore = namespace("user");

@Component({})
export default class Test1 extends Vue {
  aa = "1";

  @Getter("list") list: any;
  @Mutation("ADD_LIST") addList: any;
  @userStore.State("userList") userList: any;
  @userStore.Mutation("addUser") addUser: any;
  get aaa() {
    return this.aa;
  }

  consolelog() {
    console.log(this.list);
  }
}
// export default Vue.extend({
//   name: "test1",
//   data(): object {
//     return {
//       aa: 11
//     };
//   },
//   computed: {
//     ...mapGetters(["list"]),
//     aaa() {
//       return this.aa;
//     }
//   },
//   methods: {
//     ...mapMutations({
//       addList: "ADD_LIST"
//     }),
//     consolelog() {
//       console.log(this.list);
//     }
//   }
// });
</script>
<style lang="scss">
</style>
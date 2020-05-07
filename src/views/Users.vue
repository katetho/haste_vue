<template>
  <el-row :gutter="20">
    <el-col :offset="6" :span="12">
      <div class="grid-content bg-purple">
        <router-view></router-view>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const tickets = namespace("ticketState");
@Component
export default class Users extends Vue {
}

</script>

<style lang="scss">
.el-row {
  // margin-top: 5%;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 20px;
  background-color: #f9fafc;
}
</style>

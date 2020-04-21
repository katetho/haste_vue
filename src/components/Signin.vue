<template>
  <el-form ref="form" :model="form" label-width="120px" align="left">
    <el-form-item>
      <el-col :span="11">
        <h1 align="center">Sign in</h1>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="11">
        <el-input
          placeholder="Password"
          v-model="form.password"
          style="width: 100%;"
        ></el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="11">
        <el-input
          placeholder="Password"
          v-model="form.password"
          style="width: 100%;"
        ></el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="11">
        <el-button type="primary" @click="onSubmit">Sign in</el-button>
        <el-button @click="$router.go(-1)">Cancel</el-button>
      </el-col>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FormSignin } from "../types/types";
@Component
export default class AddTicket extends Vue {
  @Prop() form: FormSignin = {
    email: "",
    password: ""
  };
  onSubmit() {
    console.log(this.form);
  }
}
console.log(this);
</script>

<style scoped>
.el-form {
  padding: 10% 0%;
}
</style>

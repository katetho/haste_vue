<template>
  <el-form ref="form" :model="form" label-width="120px" align="left">
    <el-form-item>
      <el-col :span="11">
        <h1 align="center">Register</h1>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="11">
        <el-input
          placeholder="First Name"
          v-model="form.firstName"
          style="width: 100%;"
        ></el-input>
      </el-col>
      <el-col :span="11">
        <el-input
          placeholder="Last Name"
          v-model="form.lastName"
          style="width: 100%;"
        ></el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="11">
        <el-select v-model="form.department" placeholder="Department">
          <el-option label="Sales" value="Sales"></el-option>
          <el-option label="IT department" value="IT department"></el-option>
          <el-option
            label="Customer Support"
            value="Customer Support"
          ></el-option>
          <el-option label="Staff" value="Staff"></el-option>
          <el-option label="External" value="External"></el-option>
          <el-option label="Other" value="Other"></el-option>
        </el-select>
      </el-col>
      <el-col :span="11">
        <el-input v-model="form.email" placeholder="Email"> </el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="11">
        <el-input
          type="password"
          placeholder="Password"
          v-model="form.password"
          style="width: 100%;"
        ></el-input>
      </el-col>
      <el-col :span="11">
        <el-input
          type="password"
          placeholder="Repeat Password"
          v-model="form.repPassword"
          style="width: 100%;"
        ></el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="11">
        <el-button type="primary" @click="onSubmit">Register</el-button>
        <el-button @click="$router.go(-1)">Cancel</el-button>
      </el-col>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FormRegister } from "../types/types";
@Component
export default class AddTicket extends Vue {
  @Prop() form: FormRegister = {
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    password: "",
    repPassword: ""
  };
  onSubmit() {
    this.$store
      .dispatch("ticketState/register", {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        department: this.form.department,
        password: this.form.password,
        repPassword: this.form.repPassword
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$router.push({ name: "signin" });
        }
      })
      .catch(err => console.log(err));
  }
}
console.log(this);
</script>

<style scoped>
.el-form {
  padding: 10% 0%;
}
</style>

<template>
  <el-form ref="ruleForm" v-bind:rules="rules"  class="demo-ruleForm" :model="form" label-width="120px" align="left">
    <el-form-item>
      <el-col :span="11">
        <h1 align="center">Register</h1>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="11">
    <el-form-item prop="name">
        <el-input
          placeholder="First Name"
          v-model="form.firstName"
          style="width: 100%;"
        ></el-input>
    </el-form-item>
      </el-col>
      <el-col :span="11">
    <el-form-item prop="name">
        <el-input
          placeholder="Last Name"
          v-model="form.lastName"
          style="width: 100%;"
        ></el-input>
    </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="11">
    <el-form-item prop="department">
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
    </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-input v-model="form.email" placeholder="Email"> </el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="11">
        <el-input
          prop="pass"
          type="password"
          placeholder="Password"
          v-model="form.password"
          style="width: 100%;"
        ></el-input>
      </el-col>
      <el-col :span="11">
        <el-input
          prop="checkPass"
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
export default class Register extends Vue {
  @Prop() form: FormRegister = {
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    password: "",
    repPassword: ""
  };

  @Prop() rules = {
          name: [
            { required: true, message: 'Please enter your name', trigger: 'blur' },
            { min: 3, max: 5, message: 'Length should be 3 to 20', trigger: 'blur' }
          ],
          department: [
            { required: true, message: 'Please enter department', trigger: 'blur' },
            { min: 3, max: 5, message: 'Length should be 3 to 20', trigger: 'blur' }
          ]
        };

  onSubmit() {
    (this.$refs["ruleForm"] as any).validate((valid) => {
  if (valid) {
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
  } else {
    console.log('error submit!!');
    return false;
  }
});
  }
}
console.log(this);
</script>

<style scoped>
.el-form {
  padding: 10% 0%;
}
</style>

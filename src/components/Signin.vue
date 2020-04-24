<template>
  <el-form ref="ruleForm" :model="ruleForm" label-width="120px" align="left">
    <el-form-item>
      <el-col :span="11">
        <h1 align="center">Sign in</h1>
      </el-col>
    </el-form-item>
    <el-form-item prop="email">
      <el-col :span="11">
        <el-input
          placeholder="Email"
          v-model="ruleForm.email"
          style="width: 100%;"
        ></el-input>
      </el-col>
    </el-form-item>
    <el-form-item prop="pass">
      <el-col :span="11">
        <el-input
          type="password"
          placeholder="Password"
          v-model="ruleForm.password"
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
export default class Signin extends Vue {
  @Prop() ruleForm: FormSignin = {
    email: "",
    password: ""
  };

    validatePass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('Please input the password'));
    } else {
      callback();
    }
  };

  get rules() {
    return {
      pass: [{ validator: this.validatePass, trigger: 'blur' }],
      email: [
            { required: true, message: 'Please enter your email', trigger: 'blur' },
            { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' }
          ],
    };
  }

  onSubmit() {
        (this.$refs["ruleForm"] as any).validate((valid) => {
      if (valid) {
        this.$store
      .dispatch("ticketState/authenticate", {
        email: this.ruleForm.email,
        password: this.ruleForm.password
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$router.push({ name: "listTickets" });
        }
      })
      .catch(err => console.log(err));
        return true;
      }
      console.log('error submit!!');
      return false;
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

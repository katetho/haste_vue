<template>
  <div>
    <h1>Sign In</h1>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
    >
      <el-form-item label="Eame" prop="email">
        <el-input
          type="text"
          v-model="ruleForm.email"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >Sign In</el-button
          >
          <el-button @click="$router.go(-1)">Cancel</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FormSignin } from "../types/types";

@Component
export default class Signin extends Vue {
  ruleForm: FormSignin = {
    email: "",
    password: ""
  };

  validatePass = (rule, value, callback) => {
    if (/^(?=\w*\d)(?=\w*[a-zA-Z])\w{8,50}$/.test(value)) {
      callback();
    } else {
      callback(new Error("Incorrect password"));
    }
  };

  validateEmail = (rule, value, callback) => {
    if (/^\w{1,64}@(?:\w|\.){1,256}$/.test(value)) {
      callback();
    } else {
      callback(new Error("Invalid email address"));
    }
  };

  get rules() {
    return {
      password: [{ validator: this.validatePass, trigger: "blur" }],
      email: [{ validator: this.validateEmail, trigger: "blur" }]
    };
  }

  submitForm(formName) {
    (this.$refs[formName] as any).validate(valid => {
      if (valid) {
        this.$store
          .dispatch("ticketState/authenticate", {
            email: this.ruleForm.email,
            password: this.ruleForm.password
          })
          .then(res => {
            if (res.status === 200) {
              this.$router.push({ name: "listTickets" });
            }
          })
          .catch(err => {
            let title = "Error";
            let text = "Something went wrong";
            if (err.response.data === "email") {
              title = "User doesn't exist";
              text = "No user with this email address";
            } else if (err.response.data === "password") {
              title = "Wrong password";
              text = "Make sure caps lock is off";
            }
            this.$notify({
              group: "form",
              type: "error",
              title,
              text
            });
          });
        return true;
      }
      return false;
    });
  }
}
</script>

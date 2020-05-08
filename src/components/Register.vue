<template>
  <div>
    <h1>Register</h1>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="140px"
    >
      <el-form-item label="First Name" prop="firstName">
        <el-input
          type="text"
          v-model="ruleForm.firstName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Last Name" prop="lastName">
        <el-input
          type="text"
          v-model="ruleForm.lastName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input
          type="text"
          v-model="ruleForm.email"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Department" prop="department">
        <el-select v-model="ruleForm.department" placeholder="Department">
          <el-option label="Sales" value="Sales"></el-option>
          <el-option label="IT Department" value="IT Department"></el-option>
          <el-option
            label="Customer Support"
            value="Customer Support"
          ></el-option>
          <el-option label="Staff" value="Staff"></el-option>
          <el-option label="External" value="External"></el-option>
          <el-option label="Other" value="Other"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Repeat Password" prop="repPassword">
        <el-input
          type="password"
          v-model="ruleForm.repPassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >Submit</el-button
          >
          <el-button @click="$router.go(-1)">Cancel</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FormRegister } from "../types/types";
@Component
export default class Register extends Vue {
  ruleForm: FormRegister = {
    password: "",
    repPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    department: ""
  };

  checkPass = (rule, value, callback) => {
    if (value === this.ruleForm.password) {
      callback();
    } else {
      callback(new Error("Passwords don't match"));
    }
  };

  validatePass = (rule, value, callback) => {
    if (/^(?=\w*\d)(?=\w*[a-zA-Z])\w{8,50}$/.test(value)) {
      callback();
    } else {
      callback(
        new Error(
          "Password should consist of 8 or more symbols, including numbers"
        )
      );
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
      firstName: [
        { required: true, message: "Please enter your name", trigger: "blur" },
        {
          min: 3,
          max: 20,
          message: "Length should be 3 to 20",
          trigger: "blur"
        }
      ],
      lastName: [
        { required: true, message: "Please enter your name", trigger: "blur" },
        {
          min: 3,
          max: 20,
          message: "Length should be 3 to 20",
          trigger: "blur"
        }
      ],
      password: [
        { required: true, message: "Please enter a password", trigger: "blur" },
        { validator: this.validatePass, trigger: "blur" }
      ],
      repPassword: [{ validator: this.checkPass, trigger: "blur" }],
      email: [
        { required: true, message: "Please enter your name", trigger: "blur" },
        { validator: this.validateEmail, trigger: "blur" }
      ],
      department: [
        { required: true, message: "Please enter your name", trigger: "blur" },
        {
          min: 3,
          max: 20,
          message: "Length should be 3 to 20",
          trigger: "blur"
        }
      ]
    };
  }

  submitForm(formName) {
    (this.$refs[formName] as any).validate(valid => {
      if (valid) {
        this.$store
          .dispatch("ticketState/register", {
            firstName: this.ruleForm.firstName,
            lastName: this.ruleForm.lastName,
            email: this.ruleForm.email,
            department: this.ruleForm.department,
            password: this.ruleForm.password,
            repPassword: this.ruleForm.repPassword
          })
          .then(res => {
            if (res.status === 200) {
              this.$router.push({ name: "signin" });
            }
          })
          .catch(err => {
            const errorMsg = err.response.data.join(", ");
            this.$notify({
              group: "form",
              type: "error",
              text: errorMsg[0].toUpperCase() + errorMsg.slice(1)
            });
          });
        return true;
      }
      console.log("error!!");
      return false;
    });
  }

  resetForm(formName) {
    // this.$refs[formName].resetFields();
    const ref: any = this.$refs[formName];
    ref.resetFields();
  }
}
</script>

<template>
  <div>
    <h1>Create a ticket</h1>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="140px"
    >
      <el-form-item label="Title" prop="title">
        <el-input
          type="text"
          v-model="ruleForm.title"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Department" prop="department">
        <el-select v-model="ruleForm.department" placeholder="Department">
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
      <el-form-item label="Priority" prop="priority">
        <el-select v-model="ruleForm.priority" placeholder="Priority">
          <el-option label="Urgent" value="Urgent"></el-option>
          <el-option label="High" value="High"></el-option>
          <el-option label="Normal" value="Normal"></el-option>
          <el-option label="Low" value="Low"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Deadline" prop="deadline">
        <el-date-picker
      v-on:change="onChange"
          type="date"
          v-model="ruleForm.deadline"
          autocomplete="off"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input
          type="textarea"
          v-model="ruleForm.description"
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
import { FormAdd } from "../types/types";
import moment from "moment"
@Component
export default class AddTicket extends Vue {
  ruleForm: FormAdd = {
    title: "",
    department: "",
    priority: "",
    deadline: new Date(),
    description: ""
  };

  valiDate = (rule, value, callback) => {
    if (value instanceof Date) {
      callback();
    } else {
      callback(new Error(""));
    }
  };

  get rules() {
    return {
      title: [
        { required: true, message: "Empty title", trigger: "blur" },
        {
          min: 3,
          max: 20,
          message: "Length should be 3 to 20",
          trigger: "blur"
        }
      ],
      department: [
        { required: true, message: "Missing department", trigger: "blur" },
        {
          min: 3,
          max: 20,
          message: "Length should be 3 to 20",
          trigger: "blur"
        }
      ],
      priority: [
        { required: true, message: "Missing priority", trigger: "blur" },
        {
          min: 3,
          max: 20,
          message: "Length should be 3 to 20",
          trigger: "blur"
        }
      ],
      description: [
        { required: true, message: "Empty description", trigger: "blur" },
        {
          min: 3,
          max: 500,
          message: "Length should be 3 to 500",
          trigger: "blur"
        }
      ],
      deadline: [
        { required: true, message: "Missing deadline", trigger: "blur" },
        { validator: this.valiDate, trigger: "blur" }
      ]
    };
  }

  submitForm(formName) {
    (this.$refs[formName] as any).validate(valid => {
      if (valid) {
        this.$store
          .dispatch("ticketState/addTicket", {
            title: this.ruleForm.title,
            department: this.ruleForm.department,
            priority: this.ruleForm.priority,
            deadline: this.ruleForm.deadline.toLocaleString(),
            description: this.ruleForm.description
          })
          .then(res => {
            if (res.status === 200) {
              this.$router.push({ name: "listTickets" });
            }
          })
          .catch(err => console.log(err));
        this.ruleForm = {
          title: "",
          department: "",
          priority: "",
          deadline: new Date(),
          description: ""
        };
        return true;
      }
      return false;
    });
  }

  onChange() {
    this.$store.dispatch("ticketState/getSignin").then((signedin) => {
      if (!signedin) {
        this.$router.push({ name: "signin" });
      }
    });
  }

  resetForm(formName) {
    // this.$refs[formName].resetFields();
    const ref: any = this.$refs[formName];
    ref.resetFields();
  }
}
</script>

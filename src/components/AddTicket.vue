<template>
  <el-row>
    <el-col :span="8">
      <div class="grid-content bg-purple-dark">
        <el-form ref="form" :model="form" label-width="120px" align="left">
          <el-form-item label="Title" align="left">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="Department" align="left">
            <el-select v-model="form.department" placeholder="Department">
              <el-option label="Sales" value="Sales"></el-option>
              <el-option
                label="IT department"
                value="IT department"
              ></el-option>
              <el-option
                label="Customer Support"
                value="Customer Support"
              ></el-option>
              <el-option label="Staff" value="Staff"></el-option>
              <el-option label="External" value="External"></el-option>
              <el-option label="Other" value="Other"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Deadline" align="left">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="yyyy-mm-dd"
                v-model="form.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2"></el-col>
          </el-form-item>
          <el-form-item label="Priority" align="left">
            <el-select v-model="form.priority" placeholder="Priority">
              <el-option label="Urgent" value="Urgent"></el-option>
              <el-option label="High" value="High"></el-option>
              <el-option label="Normal" value="Normal"></el-option>
              <el-option label="Low" value="Low"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Description" align="left">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button @click="$router.go(-1)">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FormData } from "../types/types";
@Component
export default class AddTicket extends Vue {
  @Prop() form: FormData = {
    title: "",
    department: "",
    deadline: new Date(),
    priority: "",
    description: ""
  };
  onSubmit() {
    console.log(this.form);
  }
}
console.log(this);
</script>

<style></style>

<template>
<el-form ref="form" :model="form" label-width="120px">
  <el-form-item label="Title">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="Department">
    <el-select v-model="form.department" placeholder="please select your zone">
      <el-option label="Sales" value="Sales"></el-option>
      <el-option label="IT department" value="IT department"></el-option>
      <el-option label="Customer Support" value="Customer Support"></el-option>
      <el-option label="Staff" value="Staff"></el-option>
      <el-option label="External" value="External"></el-option>
      <el-option label="Other" value="Other"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Activity time">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="Choose deadline" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
  </el-form-item>
  <el-form-item label="Priority">
    <el-select v-model="form.priority" placeholder="please select your zone">
      <el-option label="Urgent" value="Urgent"></el-option>
      <el-option label="High" value="High"></el-option>
      <el-option label="Normal" value="Normal"></el-option>
      <el-option label="Low" value="Low"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Description">
    <el-input type="textarea" v-model="form.description"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">Create</el-button>
    <el-button>Cancel</el-button>
  </el-form-item>
</el-form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          title: '',
          department: '',
          deadline: '',
          priority: '',
          description: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style></style>

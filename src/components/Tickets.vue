<template>
<el-container>
  <el-header>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" align="center" @select="handleSelect">
  <el-menu-item index="1">Dashboard</el-menu-item>
  <el-submenu index="2">
    <template slot="title">Tickets</template>
    <el-menu-item index="2-1">Outgoing</el-menu-item>
    <el-menu-item index="2-2">Take a ticket</el-menu-item>
    <el-menu-item index="2-3">My tickets</el-menu-item>
  </el-submenu>
  
  <el-button type="primary">New Ticket</el-button>
  </el-menu>
<div class="line"></div>
  </el-header>
  <el-container>
    <el-aside width="200px"> 
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="1" align='left'>
        <i class="el-icon-menu"></i>
        <span>Active</span>
      </el-menu-item>
      <el-menu-item index="2" align='left'>
        <i class="el-icon-menu"></i>
        <span>Assigned</span>
      </el-menu-item>
      <el-menu-item index="3" disabled align='left'>
        <i class="el-icon-menu"></i>
        <span>Unassigned</span>
      </el-menu-item>
      <el-menu-item index="4" align='left'>
        <i class="el-icon-menu"></i>
        <span>Closed</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <el-main>
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>Card name</span>
    <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'List item ' + o }}
  </div>
</el-card>

    </el-main>
  </el-container>
</el-container>
</template>

<script>
//import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Tickets",
  methods: {
    ...mapActions(["fetchTickets"])
  },
  computed: mapGetters(["allTickets"]),
  created() {
    this.fetchTickets();
  }
};
</script>

<style lang="scss" scoped>
  .el-menu-item {
    align-content: left;
  }
  .el-row {
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
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
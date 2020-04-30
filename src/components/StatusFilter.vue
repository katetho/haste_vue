<template>
  <el-select
    v-on:change="changeStatus" v-model="value" filterable placeholder="Filter by status">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FilterOptions } from "../types/types";
@Component
export default class StatusFilter extends Vue {
  value="";
  options: FilterOptions[] = [
    { value: "active", label: "Active" },
    {
      value: "assigned",
      label: "Assigned"
    },
    {
      value: "unassigned",
      label: "Unassigned"
    },
    {
      value: "closed",
      label: "Closed"
    }
  ];

  changeStatus() {
    this.$store.dispatch("ticketState/setStatusFilter", this.value);
    this.$store.dispatch("ticketState/fetchData")
  }
}
</script>

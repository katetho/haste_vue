<template>
  <el-select v-model="value" filterable placeholder="Filter by status">
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
import { FilterOptions } from "../types/types"
@Component
export default class StatusFilter extends Vue {
  @Prop() options: FilterOptions[] = [
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
}
</script>
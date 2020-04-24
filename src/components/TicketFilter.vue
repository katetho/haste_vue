<template>
  <el-select
    v-on:change="changeRoute"
    v-model="value"
    filterable
    placeholder="Filter by type"
  >
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
export default class TicketFilter extends Vue {
  @Prop() value: string;
  @Prop() private options: FilterOptions[] = [
    { value: "", label: "List All" },
    {
      value: "outgoing",
      label: "Outgoing"
    },
    {
      value: "mytickets",
      label: "My tickets"
    },
    {
      value: "taketicket",
      label: "Take a ticket"
    }
  ];

  changeRoute() {
    this.$router.push({ path: this.value });
  }
}
</script>

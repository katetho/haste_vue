<template>
  <el-select v-model="value" filterable placeholder="Filter by type">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class TicketFilter extends Vue {
  @Prop() private options: Array<object> = [
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
}
</script>
<template>
  <div class="block">
    <el-date-picker
      v-on:change="onChange"
      v-model="value"
      type="daterange"
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date"
    >
    </el-date-picker>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FilterOptions } from "../types/types";
import { namespace } from "vuex-class";
import moment from "moment";
const tickets = namespace("ticketState");

@Component
export default class DeadlineFilter extends Vue {
  value = "";
  @tickets.State tickets;
  ticketsCopy: any[];
  @tickets.State ticketFilter;
  @tickets.State statusFilter;
  ticketFilterCopy: string;
  statusFilterCopy: string;

  created() {
    this.ticketFilterCopy = this.ticketFilter;
  }

  onChange(picker) {
    if (
      (((!this.ticketsCopy || this.ticketsCopy.length === 0)) ||
       (this.ticketFilter !== this.ticketFilterCopy) ||
       (this.statusFilter !== this.statusFilterCopy)) &&
      this.tickets
    ) {
      this.ticketsCopy = Array.from(this.tickets);
      console.log(this.tickets);
      this.ticketFilterCopy=this.ticketFilter;
      this.statusFilterCopy=this.statusFilter;
    }
    if (this.value) {
      const matches = this.ticketsCopy.filter((el) => {
        return moment(new Date(el.deadline)).isBetween(
          this.value[0],
          this.value[1]
        );
      });
      this.$store.commit("ticketState/setData", matches);
    } else {
      this.$store.dispatch("ticketState/fetchData");
    }
  }
}
</script>

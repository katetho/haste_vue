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

  created() {
    this.$store.watch(
      state => {
        return this.$store.state.ticketFilter; // could also put a Getter here
      },
      () => {
        if (this.tickets) {
          this.ticketsCopy = [...this.tickets];
        }
      }
    );
    if (this.tickets) {
      this.ticketsCopy = [...this.tickets];
    }
  }
  onChange(picker) {
    if (this.value) {
      const matches = this.ticketsCopy.filter(el => {
        console.log(moment(el.deadline).isBefore(this.value[1]));
        return moment(el.deadline).isBetween(this.value[0], this.value[1]);
      });
      if (matches.length > 0) {
        this.$store.commit("ticketState/setData", matches);
      }
    }
  }
}
</script>

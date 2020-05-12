<template>
  <el-select
    v-on:change="sort"
    v-model="value"
    filterable
    placeholder="Sort By"
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
import { Component, Vue } from "vue-property-decorator";
import { FilterOptions } from "../types/types";
import { namespace } from "vuex-class";
import moment from "moment";

const tickets = namespace("ticketState");

@Component
export default class SortBy extends Vue {
  @tickets.State tickets;
  value = "";
  options: FilterOptions[] = [
    { value: "deadline-up", label: "Deadline \u2191" },
    { value: "deadline-down", label: "Deadline \u2193" }
  ];

  sort() {
    this.$store.dispatch("ticketState/getSignin").then((signedin) => {
      if (!signedin) {
        this.$router.push({ name: "signin" });
      }
    });
    this.tickets.sort((a,b)=> {
     console.log(moment(a.deadline).format("YYYY-MM-DD"));
      if (moment(a.deadline).format("YYYY-MM-DD") > moment(b.deadline).format("YYYY-MM-DD")) {
        if(this.value === "deadline-down") {
          return -1;
        }
        else {
          return 1;
        }
      }
      else if (moment(a.deadline).format("YYYY-MM-DD") < moment(b.deadline).format("YYYY-MM-DD")) {
        if(this.value === "deadline-down") {
          return 1;
        }
        else {
          return -1;
        }
      }
      else {
        return 0;
      }
    })
  }
}
</script>

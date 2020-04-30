<template>
  <span>
    <el-input
      v-on:change="search"
      placeholder="Search..."
      v-model="input"
    ></el-input>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const tickets = namespace("ticketState");

@Component
export default class Search extends Vue {
  input = "";
  @tickets.State tickets;

  search() {
    const matches = this.tickets.filter((el) => {
      return el.title.includes(this.input);
    });
    console.log(matches);
    if (!(matches.length === 0)) {
      this.$store.commit("ticketState/setData", matches);
    }
    else {
        this.$store.dispatch("ticketState/fetchData")
    }
  }
}
</script>

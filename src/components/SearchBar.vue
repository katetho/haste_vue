<template>
  <span>
    <el-input
      v-on:change="search"
      :placeholder="$t('nav.search')"
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
  ticketsCopy: any[];
  @tickets.State ticketFilter;
  @tickets.State statusFilter;
  ticketFilterCopy: string;
  statusFilterCopy: string;

  
  search() {
    this.$store.dispatch("ticketState/getSignin").then((signedin) => {
      if (!signedin) {
        this.$router.push({ name: "signin" });
      }
    });
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
    const matches = this.ticketsCopy.filter(el => {
      return el.title.includes(this.input);
    });
    if (!(matches.length === 0)) {
      this.$store.commit("ticketState/setData", matches);
    } else {
      this.$store.dispatch("ticketState/fetchData");
    }
  }
}
</script>

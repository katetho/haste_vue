<template>
  <el-row>
     <el-col
      :span="8"
      v-for="ticket in tickets"
      :key="ticket.id"
      :offset="index > 0 ? 2 : 0"
    >
      <el-card :body-style="{ padding: '0px' }">
        <div slot="header" class="clearfix el-cardheader" align="left">
          <span>{{ ticket.title }}</span>
          <div v-if="ticket.status==='closed'">
            <span class="text">Closed</span>
          </div>
          <div v-else-if="ticket.assignedToCurrent">
            <el-button 
              @click="closeTicket(ticket.id)" style="float: right; padding: 3px 0" type="text"
              >Close Ticket
            </el-button>
          </div>
          <div v-else-if="ticket.assignee && !ticket.assignedToCurrent">
            Assigned to: {{ ticket.assignee }}
          </div>
          <div v-else-if="!ticket.assignee">
            <el-button
              @click="takeTicket(ticket.id)"
              style="float: right; padding: 3px 0"
              type="text"
              >Take Ticket
            </el-button>
          </div>
        </div>
        <div class="text item">
          {{ ticket.description }}
        </div>
        <div class="text item">Deadline: {{ ticket.deadline }}</div>
      </el-card>
    </el-col> 
  </el-row>
</template>

<script lang="ts">

import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";

const tickets = namespace("ticketState");


@Component({
  name: "Tickets",
  components: {}
})
export default class Tickets extends Vue {

  @Prop() index: number;

  @tickets.State tickets;
  @tickets.Action fetchData;


  created() {
    this.fetchData();
  }

  takeTicket(ticketId) {
    this.$store.dispatch("ticketState/setTicketTaken", ticketId)
    .then(()=>{
    this.$store.dispatch("ticketState/fetchData");
    })
  }

  closeTicket(ticketId) {
    this.$store.dispatch("ticketState/setTicketClosed", {ticketId})
    .then(()=>{
    this.$store.dispatch("ticketState/fetchData");
    })
  }
}
</script>

<style lang="scss" scoped>
.el-col-offset-0,
.el-col-offset-2 {
  margin-left: 5%;
  margin-bottom: 5%;
}

.text {
  font-size: 14px;
}

.item {
  margin-top: 18px;
  margin-bottom: 18px;
}
</style>

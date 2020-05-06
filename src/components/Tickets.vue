<template>
  <el-row type="flex" class="list-block" :gutter="20">
    <el-col class="box" :span="6" v-for="ticket in tickets" :key="ticket.id">
      <el-card :body-style="{ padding: '0px' }">
        <div slot="header" class="clearfix el-cardheader" align="left">
          <el-row type="flex" justify="space-between">
            <el-col :span="12">
              <div>
                <span>{{ ticket.title }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="controls">
                <div v-if="ticket.status === 'closed'">
                  <el-tag type="info">Closed</el-tag>
                </div>
                <div v-else-if="userID == ticket.assigneeID">
                  <el-button @click="closeTicket(ticket.id)" type="warning"
                    >Close Ticket</el-button
                  >
                </div>
                <div v-else-if="ticket.assignee && !ticket.assignedToCurrent">
                  <el-tag type="info">
                    Assigned to: {{ ticket.assignee }}
                  </el-tag>
                </div>
                <div v-else-if="!ticket.assignee">
                  <el-button @click="takeTicket(ticket.id)" type="success"
                    >Take Ticket</el-button
                  >
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="text item">{{ ticket.description }}</div>
        <div class="text item">Deadline: {{ moment(ticket.deadline) }}</div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import moment from "moment";

const tickets = namespace("ticketState");

@Component({
  name: "Tickets",
  components: {}
})
export default class Tickets extends Vue {
  @Prop() index: number;

  @tickets.State tickets;
  @tickets.Action fetchData;
  @tickets.State userID;

  moment(date) {
    return moment.utc(date).format("MMMM Do YYYY, h:mm:ss a");
  }

  created() {
    this.fetchData();
  }

  takeTicket(ticketId) {
    this.$store.dispatch("ticketState/setTicketTaken", ticketId).then(() => {
      this.$store.dispatch("ticketState/fetchData");
    });
  }

  closeTicket(ticketId) {
    this.$store
      .dispatch("ticketState/setTicketClosed", { ticketId })
      .then(() => {
        this.$store.dispatch("ticketState/fetchData");
      });
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
.list-block {
  flex-wrap: wrap;
}
.controls {
  text-align: right;
}

.box {
  min-height: 100px;
  margin-bottom: 15px;
}
.item {
  margin-top: 18px;
  margin-bottom: 18px;
}
</style>

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
          <span>{{ticket.title}}</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >Close Ticket
          </el-button>
        </div>
        <div  class="text item">
          {{ticket.description}}
        </div>
        <div  class="text item">
          Deadline: {{ticket.deadline}}
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";

const tickets = namespace("ticketState");

@Component({
  name: "Tickets",
  components: {}
})
export default class Tickets extends Vue {
  @tickets.State tickets;
  @tickets.Action fetchData;

  created() {
    this.fetchData();
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

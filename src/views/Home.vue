<template>
  <div id="nav">
    <el-container>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="3" align="left">
              <span>
                <el-input placeholder="Search..." v-model="input"></el-input>
              </span>
            </el-menu-item>
            <el-menu-item index="1" align="left">
              <i class="el-icon-menu"></i>
              <span>Dashboard</span>
            </el-menu-item>
            <el-menu-item index="2" align="left">
              <i class="el-icon-menu"></i>
              <span>Take a ticket</span>
            </el-menu-item>
            <el-menu-item index="4" align="left">
              <i class="el-icon-menu"></i>
              <span>Logout</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <el-row>
            <el-col :span="16">
              <div class="grid-content">
                <el-col :span="8">
                  <div class="grid-content">
                    <StatusFilter />
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content">
                    <TicketFilter />
                  </div>
                </el-col>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <el-button type="primary" @click="$router.push('add')"
                  >New Ticket</el-button
                >
              </div>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <router-view></router-view>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Tickets from "@/components/Tickets.vue";
import AddTicket from "@/components/AddTicket.vue";
import StatusFilter from "@/components/StatusFilter.vue";
import TicketFilter from "@/components/TicketFilter.vue";

@Component({
  components: {
    Tickets,
    StatusFilter,
    TicketFilter,
    AddTicket
  }
})
export default class Home extends Vue {
  @Prop() private input!: string;
}
</script>

<template>
  <div id="nav">
    <el-container>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="2" class="el-menu-vertical-demo">
            <div class="aside-search">
              <SearchBar />
            </div>
            <el-menu-item index="1" @click="$router.push('/')" align="left">
              <i class="el-icon-menu"></i>
              <span>{{$t("nav.dashboard")}}</span>
            </el-menu-item>
            <el-menu-item index="2" @click="takeTicket" align="left">
              <i class="el-icon-menu"></i>
              <span>{{$t("nav.taketicket")}}</span>
            </el-menu-item>
            <el-menu-item index="4" @click="logOut" align="left">
              <i class="el-icon-menu"></i>
              <span>{{$t("nav.logout")}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <el-row>
            <el-col :span="16">
              <div class="grid-content">
                <el-col :span="6" v-if="$route.name != 'add'">
                  <div class="grid-content filter">
                    <StatusFilter />
                  </div>
                </el-col>
                <el-col :span="6" v-if="$route.name != 'add'">
                  <div class="grid-content filter">
                    <TicketFilter />
                  </div>
                </el-col>
                <el-col :span="6" v-if="$route.name != 'add'">
                  <div class="grid-content filter">
                    <DeadlineFilter />
                  </div>
                </el-col>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content controls">
                <el-button type="primary" @click="$router.push('add')"
                  >New Ticket</el-button
                >
              </div>
            </el-col>
          </el-row>
          <!-- <el-divider></el-divider> -->
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
import SearchBar from "@/components/SearchBar.vue";
import DeadlineFilter from "@/components/DeadlineFilter.vue";

@Component({
  components: {
    Tickets,
    StatusFilter,
    TicketFilter,
    AddTicket,
    SearchBar,
    DeadlineFilter
  }
})
export default class Home extends Vue {
  @Prop() private input!: string;

  logOut() {
    this.$store.dispatch("ticketState/unathenticate").then(() => {
      this.$router.push({ name: "signin" });
    });
  }

  beforeUpdate() {
    console.log("updated");
  }
  
  takeTicket() {
    this.$store.dispatch("ticketState/setTicketType", "taketicket");
    this.$store.dispatch("ticketState/fetchData");
  }
}
</script>
<style scoped>
.aside-search {
  padding: 0 5px;
  margin-top: 20px;
}
.controls {
  text-align: right;
}
.filter {
  text-align: left;
}
</style>

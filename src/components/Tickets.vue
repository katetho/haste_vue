<template>
  <el-row>
    <el-col
      :span="8"
      v-for="(o, index) in 4"
      :key="o"
      :offset="index > 0 ? 2 : 0"
    >
      <el-card :body-style="{ padding: '0px' }">
        <div slot="header" class="clearfix el-cardheader" align="left">
          <span>Card name</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >Close Ticket
          </el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "List item " + o }}
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
//import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Tickets",
  methods: {
    ...mapActions(["fetchTickets"])
  },
  computed: mapGetters(["allTickets"]),
  created() {
    this.fetchTickets();
  }
};
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

<template>
  <div id="app">
    <notifications group="form" />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class App extends Vue {}
</script>

<style src="@/assets/css/style.scss" lang="scss"></style>

<template>
  <div v-if="validWxForecast">
    <WxForecast 
      v-for="forecast in wxForecast" 
      v-bind:key="forecast.fxDate"
      v-bind:date="forecast.fxDate"
    />
  </div>
</template>

<script>
import WxForecast from "./WxForecast.vue";
import { mapGetters } from 'vuex';

export default {
  name: "ForecastPannel",
  components: {
    WxForecast,
  },
  computed: {
    ...mapGetters(["wxForecast", "validWxForecast"]),
  }
}
</script>

<style>

</style>
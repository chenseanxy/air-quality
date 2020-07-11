<template>
  <v-card class='mx-auto py-0 my-4' max-width="315" min-width="315" v-if="validWxForecast">
    <v-expansion-panels accordion>
      <WxForecast 
        v-for="forecast in wxForecast" 
        v-bind:key="forecast.fxDate"
        v-bind:date="forecast.fxDate"
      />
    </v-expansion-panels>
  </v-card>
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
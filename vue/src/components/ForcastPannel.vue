<template>
  <v-card max-width="300" class='mx-auto py-0 my-4' v-if="validWxForecast">
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
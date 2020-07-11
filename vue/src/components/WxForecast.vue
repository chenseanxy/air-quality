<template>
  <v-expansion-panel>
    <v-expansion-panel-header ripple>
      {{ date }} <br> {{ wx.textDay }}, {{ wx.tempMin }}°C ~ {{ wx.tempMax }}°C
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      Weather Forecast for {{ date }} -- Placeholder
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'WxForecast',
  props: ['date'],
  computed: {
    ...mapGetters(["wxForecast"]),
    wx: function() {
      return this.wxForecast[this.date];
    }
  }, 
}
</script>

<style>

</style>
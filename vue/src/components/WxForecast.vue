<template>
  <v-expansion-panel>
    <v-expansion-panel-header ripple class="py-1">
        <v-list-item two-line class="m0 px-0">
          <v-list-item-content class="py-0 m0">
            <v-list-item-title>{{ friendlyDate }}</v-list-item-title>
            <v-list-item-subtitle>{{ wx.textDay }}, {{ wx.tempMin }}°C ~ {{ wx.tempMax }}°C</v-list-item-subtitle>
          </v-list-item-content>
      </v-list-item>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-divider class="mb-3"></v-divider>
      <v-list-item>
        <v-list-item-content class="pt-0">
          <div class="overline ">Day</div>
          <v-list-item-title>{{ wx.textDay }}</v-list-item-title>
          <v-list-item-subtitle>Max {{ wx.tempMax }}°C</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar tile size="60">
          <img :src="`WeatherIcon/weather-icon-S1/bw-256/${wx.iconDay}.png`">
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item>
        <v-list-item-content class="pt-0">
          <div class="overline">Night</div>
          <v-list-item-title>{{ wx.textNight }}</v-list-item-title>
          <v-list-item-subtitle>Min {{ wx.tempMin }}°C</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar tile size="60">
          <img :src="`WeatherIcon/weather-icon-S1/bw-256/${wx.iconNight}.png`">
        </v-list-item-avatar>
      </v-list-item>
      <p class="pb-0 pt-2 mb-0 text-body-2 text--secondary">
        Humidity<v-icon size="18">mdi-water-outline</v-icon>{{ wx.humidity }}%, 
        Precip. <v-icon size="18">mdi-weather-rainy</v-icon> {{ wx.precip }} mm
      </p>
      <p class="pb-0 pt-2 mb-0 text-body-2 text--secondary">
        Visibility <v-icon size="18">mdi-eye-outline</v-icon> {{ wx.vis }}km, 
        Cloud Covg. <v-icon size="18">mdi-cloud-outline</v-icon> {{ wx.cloud }}%<br>
      </p>

      <p class="pb-0 pt-2 mb-0 text-body-2 text--secondary">
        Sunrise <v-icon size="18">mdi-weather-sunset-up</v-icon> {{ wx.sunrise }}, 
        Sunset <v-icon size="18">mdi-weather-sunset-down</v-icon> {{ wx.sunset }}
      </p>

    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from "moment";

export default {
  name: 'WxForecast',
  props: ['date'],
  computed: {
    ...mapGetters(["wxForecast"]),
    wx: function() {
      return this.wxForecast[this.date];
    },
    friendlyDate: function() {
      return moment(this.date).calendar().split(" at")[0]
    }
  }, 
}
</script>

<style>

</style>
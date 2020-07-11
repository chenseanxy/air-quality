<template>
  <v-card class='mx-auto py-0 my-4' max-width="315" min-width="315" v-if="valid">
    <v-card-text>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline">{{ wx.text }}</v-list-item-title>
          <v-list-item-title>{{ wx.temp }}°C </v-list-item-title>
          <v-list-item-subtitle>(Feels like {{ wx.feelsLike }}°C)</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar tile size="85">
          <img :src="`WeatherIcon/weather-icon-S1/bw-256/${wx.icon}.png`">
        </v-list-item-avatar>
      </v-list-item>
      <!-- <p class="text--primary display-1">{{ wx.text }} - {{ wx.temp }}°C</p> -->
      <p class="mb-2">
        Wind <v-icon size=18>mdi-weather-windy</v-icon> {{ wx.windSpeed }}km/h from {{ wx.wind360 }}° ({{ wx.windDir }})<br>
      </p>
      <p class="mb-2">
        Humidity<v-icon size="18">mdi-water-outline</v-icon>{{ wx.humidity }}%, 
        Precip. <v-icon size="18">mdi-weather-rainy</v-icon> {{ wx.precip }} mm
      </p>
      <p class="mb-2">
        Visibility <v-icon size="18">mdi-eye-outline</v-icon> {{ wx.vis }}km, 
        Cloud Covg. <v-icon size="18">mdi-cloud-outline</v-icon> {{ wx.cloud }}%<br>
      </p>
      <p>Observed on {{ lastUpdated.time }} ({{lastUpdated.age}})</p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from "moment"

export default {
  name: "CurrentWx",
  computed: {
    ...mapGetters({wx: "currentWx", valid: "validCurrentWx"}),
    lastUpdated: function() {
      const mm = moment(this.wx.obsTime)
      return {time: mm.format("LT"), age: mm.fromNow()}
    }
  },
}
</script>

<style>

</style>
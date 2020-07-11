<template>
  <v-app id="air-quality">
    <v-app-bar app color="blue-grey" dark>
      <v-toolbar-title>Air Quality Checker</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <GeoLocation />
          </v-col>
        </v-row>
        <v-row align="center" justify="center" v-if="validLoc">
          <v-col class="text-center my-0 py-0" v-if="validAirQuality">
            <AQI />
          </v-col>

          <v-col class="text-center my-0 py-0" v-if="validCurrentWx">
            <CurrentWx />
          </v-col>

          <v-col class="text-center my-0 py-0" v-if="validWxForecast">          
            <ForecastPannel />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer color="blue-grey" dark app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import GeoLocation from "./components/GeoLocation.vue"
import AQI from "./components/AQI.vue"
import CurrentWx from "./components/CurrentWx.vue"
import ForecastPannel from "./components/ForcastPannel.vue"
import { mapGetters } from 'vuex'

export default{
  name: 'app',
  components: {
    GeoLocation,
    AQI,
    CurrentWx,
    ForecastPannel,
  },
  computed: {
    ...mapGetters(["validAirQuality", 'validCurrentWx', 'validLoc', 'validWxForecast']),
  },
}
</script>

<style scoped>

</style>
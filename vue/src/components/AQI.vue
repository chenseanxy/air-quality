<template>
  <div>
    <p>AQI - {{ airQuality.aqi }}</p>
    <p>AQI Level - {{ airQuality.category }}</p>
    <p>PM 2.5 - {{ airQuality.pm2p5 }} | PM 10 - {{airQuality.pm10}}</p>
    <p>NO2 - {{ airQuality.no2 }} | SO2 - {{airQuality.so2}}</p>
    <p>CO - {{ airQuality.co }} | O3 - {{airQuality.o3}}</p>
    <p>Last Updated: {{ lastUpdated }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "AQI", 
  computed: {
    ...mapGetters(['airQuality', 'validAirQuality']),
    lastUpdated: function() {
      return moment(this.airQuality.pubTime).fromNow();
    }
  }
}
</script>

<style>

</style>
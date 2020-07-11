<template>
  <v-card class='mx-auto py-0 my-4' max-width="300" v-if="validAirQuality">
    <v-card-text>
      <v-container class="pa-0">
        <v-row>
          <v-col class="py-4 px-10 my-auto">
              <p>AQI <br>
              <span class='display-3 text--primary'>{{ airQuality.aqi }}</span>
              </p>
              <p>
                <span>AQI Level<br></span>
                <span class='text--primary'>{{ airQuality.category }}</span>
              </p>
              <p>Last Updated<br> 
                <span class='text--primary text-capitalize'>{{ lastUpdated }}</span>
              </p>
          </v-col>

          <v-divider inset vertical></v-divider>

          <v-col class="text-left pl-6 py-2 my-auto" md="auto">
            <p>PM 2.5 - <span class="text--primary">{{ airQuality.pm2p5 }}</span></p>
            <p>PM 10 - <span class="text--primary">{{ airQuality.pm10 }}</span></p>
            <p>NO2 - <span class="text--primary">{{ airQuality.no2 }}</span></p>
            <p>SO2 - <span class="text--primary">{{ airQuality.so2 }}</span></p>
            <p>CO - <span class="text--primary">{{ airQuality.co }}</span></p>
            <p>O3 - <span class="text--primary">{{ airQuality.o3 }}</span></p>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
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
<template>
  <v-chip v-ripple :color="chipColor" v-on:click="locButton()">
    <v-avatar left>
      <v-icon>mdi-crosshairs-gps</v-icon>
    </v-avatar>
    <span v-if="validLoc"> {{ locationText }}</span>
    <span v-else> Press to gather location data</span>
  </v-chip>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GeoLocation',
  computed: {
    ...mapGetters(['loc', 'validLoc']),
    chipColor: function(){
      if(this.validLoc) return 'default';
      return 'secondary';
    },
    locationText: function(){
      const {country, province, city, district} = this.loc;
      var levels = [country, province, city, district];
      var validLevels = levels.filter(function (el) {
        return el != '';
      });
      return validLevels.join(' - ');
    }
  },

  methods: {
    async locButton(){
      try{
        await this.$store.dispatch('updateCoords');
        const airQuality = this.$store.dispatch('updateAirQuality');
        const currWx = this.$store.dispatch('updateCurrentWx');
        const wxForecast = this.$store.dispatch('updateWxForecast');

        await Promise.all([airQuality, currWx, wxForecast])
      } catch (err) {
        this.$dialog.notify.error(
          err.toString(), {position: 'bottom-right'}
        );
      }
    }
  }
}

</script>

<style>

</style>
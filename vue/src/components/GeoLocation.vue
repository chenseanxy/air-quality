<template>
  <p>
    <v-icon v-on:click="locButton()">mdi-crosshairs-gps</v-icon>
    <span v-if="validLoc"> {{ loc.country }} - {{ loc.province }} - {{ loc.city }} - {{loc.district}}</span>
    <span v-else> Press to gather location data</span>
  </p>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GeoLocation',
  computed: mapGetters(['loc', 'validLoc']),

  methods: {
    async locButton(){
      try{
        await this.$store.dispatch('updateCoords');
        const airQuality = this.$store.dispatch('updateAirQuality');
        const currWx = this.$store.dispatch('updateCurrentWx');

        await Promise.all([airQuality, currWx])
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
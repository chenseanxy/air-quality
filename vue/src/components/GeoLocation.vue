<template>
  <div>
    <v-icon v-on:click="locButton()">mdi-crosshairs-gps</v-icon>
    <span v-if="validLoc"> {{ loc.country }} - {{ loc.province }} - {{ loc.city }} - {{loc.district}}</span>
    <span v-else> Press to gather location data</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GeoLocation',
  computed: mapGetters(['loc', 'validLoc']),
  data() {
    return {
    }
  },
  methods: {
    locButton(){
      this.$store.dispatch('updateCoords')
        .catch(err => this.$dialog.notify.error(
          err.toString(), {position: 'bottom-right'}
        ));
    }
  }
}

</script>

<style>

</style>
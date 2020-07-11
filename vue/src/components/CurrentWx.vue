<template>
  <v-card class='mx-auto py-0 my-4' max-width="300" v-if="valid">
    <v-card-text>
      <p class="text--primary display-1">{{ wx.text }} - {{ wx.temp }}°C</p>
      <p><span class="text--primary display-1"></span> (Feels like {{ wx.feelsLike }}°C)</p>
      <p>Humidity {{ wx.humidity }}% | Precipitation {{ wx.precip }}% chance</p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "CurrentWx",
  computed: {
    ...mapGetters({wx: "currentWx", valid: "validCurrentWx"}),
  },
}
</script>

<style>

</style>
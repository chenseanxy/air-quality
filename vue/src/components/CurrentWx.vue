<template>
  <div>
    <p>Current Weather: {{ wx.text }}</p>
    <p>{{ wx.temp }}°C (Feels like {{ wx.feelsLike }}°C)</p>
    <p>Humidity {{ wx.humidity }}% | Precipitation {{ wx.precip }}% chance</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "CurrentWx",
  computed: {
    ...mapGetters({wx: "currentWx"}),
  },
}
</script>

<style>

</style>
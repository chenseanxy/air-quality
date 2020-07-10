<template>
  <div>
    <p>Forecast of {{ date }} - {{ wx.textDay }} in the day, {{wx.textNight}} in the night</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'WxForecast',
  props: ['date'],
  computed: {
    ...mapGetters(["wxForecast"]),
    wx: function() {
      return this.wxForecast[this.date];
    }
  }, 
}
</script>

<style>

</style>
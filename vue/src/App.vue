<template>
  <v-app id="inspire">
    <v-app-bar app color="blue-grey" dark>
      <v-toolbar-title>Air Quality Checker</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <GeoLocation />
            <AQI />
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

export default{
  name: 'app',
  components: {
    GeoLocation,
    AQI,
  }
}
</script>

<style scoped>

</style>
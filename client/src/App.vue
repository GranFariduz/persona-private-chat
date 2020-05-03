<template>
  <v-app id="app">
    <router-view />
    <v-alert
      class="msg-alert"
      v-if="getAlert.show"
      border="left"
      colored-border
      type="error"
      elevation="2"
      dismissible
      transition="scale-transition"
      >{{ getAlert.message }}</v-alert
    >
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getAlert"]),
  },
};
</script>

<style lang="scss">
// importing Poppins
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap");

html {
  overflow-y: hidden !important;
}

#app {
  overflow-y: auto !important;
  font-family: Poppins, Helvetica, sans-serif;
}

.msg-alert {
  width: 400px;
  left: 50px;
  bottom: 100px;
}
</style>

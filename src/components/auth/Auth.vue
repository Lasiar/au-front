<template>
  <v-layout class="mt-10" align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-tabs
        class="elevation-10"
        dark
        background-color="indigo"
        grow
        slider-color="white"
      >
        <v-tab> Вход </v-tab>
        <v-tab> Регистрация </v-tab>
        <v-tab-item>
          <Login></Login>
        </v-tab-item>
        <v-tab-item>
          <Registration></Registration>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
import Login from "./Login";
import Registration from "./Registration";

export default {
  name: "auth",
  components: {
    Login: Login,
    Registration: Registration
  }
};
</script>

<style scoped></style>

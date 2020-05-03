<template>
  <div class="home">
    <h1 class="logo">Persona</h1>
    <v-card class="register-card" width="400" outlined>
      <v-form @submit.prevent="onRegister">
        <v-text-field v-model="name" label="Username" required></v-text-field>
        <v-btn type="submit" class="w-100" color="primary" depressed>register</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    name: ""
  }),
  methods: {
    ...mapActions(["setUsername", "setAlert"]),
    onRegister() {
      if (!this.name.trim()) {
        this.setAlert({
          show: true,
          message: "Please enter a username to register"
        });
        return;
      }
      this.setAlert({ show: false, message: "" });
      this.setUsername(this.name);
      this.$router.history.push("/chat");
    }
  }
};
</script>

<style lang="scss">
.home {
  height: 100vh;
  width: 100vw;
  background-color: #2b81d6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
}
.logo {
  color: white;
  margin-bottom: 30px;
}
.register-card {
  box-sizing: border-box;
  padding: 30px;
}
.msg-alert {
  position: fixed;
  left: 20px;
  bottom: 20px;
}
.w-100 {
  width: 100%;
}
</style>
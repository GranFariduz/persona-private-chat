<template>
  <div id="chat">
    <v-card>
      <v-toolbar flat color="info" dark>
        <v-toolbar-title>Users</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical>
        <template v-if="activeUsers.length !== 0">
          <v-tab v-for="client in activeUsers" :key="client.id" @click="onSelect(client.id)">
            <v-icon left>mdi-account</v-icon>
            <div>{{ client.name }}</div>
          </v-tab>
        </template>
        <template v-else>
          <div>No users yet..</div>
        </template>
        <template v-if="activeUsers.length !== 0">
          <v-tab-item v-for="client in activeUsers" :key="client.id">
            <v-card flat>
              <Message :sendToName="client.name" />
            </v-card>
          </v-tab-item>
        </template>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

// components
import Message from "@/components/Message.vue";

export default {
  components: {
    Message
  },
  data: () => ({
    clients: [],
    messages: []
  }),
  computed: {
    ...mapGetters(["getUsername"]),
    activeUsers() {
      const $ = this;
      const removeIndex = $.clients.findIndex(
        client => client.id === $.$socket.id
      );
      $.clients.splice(removeIndex, 1);
      return $.clients;
    }
  },
  methods: {
    ...mapActions(["setSendToId"]),
    onSelect(id) {
      const $ = this;
      $.setSendToId(id);
    }
  },
  updated() {
    const $ = this;
    if ($.clients[0]) $.setSendToId($.clients[0].id);
  },
  mounted() {
    const $ = this;

    if (!$.getUsername) return $.$router.history.push("/");

    $.$socket.emit("join", $.getUsername);
    $.$socket.on("clients", users => ($.clients = users));
  }
};
</script>

<style>
#chat {
  height: 100vh;
  width: 100vw;
  background-color: #2b81d6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}
</style>
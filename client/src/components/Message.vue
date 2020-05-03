<template>
  <div id="message">
    <div ref="messageArea" class="message-area">
      <template v-if="messages.length > 0">
        <div v-for="message in messages" :key="message.id">
          <template v-if="message.user === sendToName">
            <v-card class="receiveText">
              <v-card-subtitle>{{ message.message }}</v-card-subtitle>
            </v-card>
          </template>
          <template v-else>
            <v-card class="sendText" dark color="#2b81d6">
              <v-card-subtitle>{{ message.message }}</v-card-subtitle>
            </v-card>
          </template>
        </div>
      </template>
      <template v-else>
        <small>start chatting...</small>
      </template>
    </div>
    <v-form @submit.prevent="onSendMessage">
      <v-row>
        <v-col md="10">
          <v-text-field
            v-model="message"
            placeholder="Enter a message..."
            solo
            auto-focus
            dense
          ></v-text-field>
        </v-col>
        <v-col md="2">
          <v-btn type="submit" color="primary" depressed>SEND</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { v4 as uuid } from "uuid";
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    sendToName: String,
  },
  data: () => ({
    message: "",
    messages: [],
  }),
  computed: {
    ...mapGetters(["getUsername", "getSendToId"]),
  },
  methods: {
    ...mapActions(["setAlert"]),
    scrollToBottom() {
      const $ = this;
      const messageArea = $.$refs.messageArea;
      messageArea.scrollTop = messageArea.scrollHeight + 500;
    },
    onSendMessage() {
      const $ = this;

      if (!$.message.trim()) {
        return $.setAlert({
          show: true,
          message: "Please enter a message to send",
        });
      }

      $.messages.push({ id: uuid(), user: "you", message: $.message });

      $.$socket.emit("privateMessage", {
        receiverId: $.getSendToId,
        message: $.message,
      });

      $.message = "";
      $.scrollToBottom();
    },
  },
  mounted() {
    const $ = this;
    $.$socket.on("privateMessage", (data) => {
      if ($.sendToName === data.user) $.messages.push(data);
      $.scrollToBottom();
    });
  },
};
</script>

<style lang="scss">
#message {
  box-sizing: border-box;
  padding: 0 30px;

  .message-area {
    box-sizing: border-box;
    padding: 20px;
    height: 400px;
    width: 500px;
    overflow-y: auto;
  }

  .receiveText {
    width: 300px;
    color: white;
    margin: 20px;
  }

  .sendText {
    width: 300px;
    color: black;
    margin: 20px;
    margin-left: 160px;
  }
}
</style>

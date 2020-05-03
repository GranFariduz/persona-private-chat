const express = require("express");
const socketio = require("socket.io");
const { v4: uuid } = require("uuid");

const app = express();

// port
const PORT = process.env.PORT || 2000;

app.use(express.json());

const server = app.listen(PORT, () => console.log(`server started on ${PORT}`));

// user
const { users, addUser, removeUser, getUser } = require("./user");

// socketio
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("join", (name) => {
    addUser(socket.id, name);
    io.emit("clients", users);

    socket.on("privateMessage", ({ receiverId, message }) => {
      const sender = getUser(socket.id);
      io.to(receiverId).emit("privateMessage", {
        id: uuid,
        user: sender.name,
        message,
      });
    });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("clients", users);
  });
});

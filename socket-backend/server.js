const express = require("express");
const app = express();

const socket = require("socket.io");
const colors = require("colors");
const cors = require("cors");
const { join_user,
    get_current_user, 
    user_disconnect } = require("./user");

app.use(express());

const port = 8000;

app.use(cors());

var server = app.listen(
    port,
    console.log(
        `Server is running on port no: ${port}`
            .green
    )
);

const io = socket(server);

io.on("connection", (socket) => {
    socket.on("joinRoom", ({ username, roomname }) => {
        const p_user = join_user(socket.id, username, roomname);
        console.log(socket.id, "=id")
        socket.join(p_user.room);

        socket.emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: `Welcome ${p_user.username}`
        });

        socket.broadcast.to(p_user.room).emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: `${p_user.username} has joined the chat`,
        });
    });

    // TODO: create a chess move controller

    socket.on("disconnect", () => {
        const p_user = user_disconnect(socket.id);

        if (p_user) {
            io.to(p_user.room).emit("message", {
              userId: p_user.id,
              username: p_user.username,
              text: `${p_user.username} has left the room`,
            });
        }
    });
})
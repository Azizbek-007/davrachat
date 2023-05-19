const { io } = require("socket.io-client");


const socket = io("ws://103.54.56.168:8081");

socket.on("connect", () => {
    console.log(socket.connected); // true
});

socket.on("disconnect", () => {
    console.log(socket.disconnected); // true
});
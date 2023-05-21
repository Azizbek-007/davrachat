const { io } = require("socket.io-client");


const socket = io("ws://103-54-56-168.cloud-xip.com:11111");

socket.on("connect", (data) => {
    console.log('Connected'); // true
});

socket.on("disconnect", () => {
    console.log('Disconnect'); // true
});
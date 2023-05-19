const { io } = require("socket.io-client");


const socket = io("ws://103.54.56.168:8081", {
    'extraHeaders': {
        'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vc3RmYWN0dXpAZ21haWwuY29tIiwic3ViIjo3LCJpYXQiOjE2ODQ0MDc5MzgsImV4cCI6MTY4NTAxMjczOH0.B2MDkE_YzvHKvMEBhQ6W7rFiTWhLFna2wO8z7AiSBXI'
    }
});

socket.on("onMessageSend", (data) => {
    console.log(data); // true
});

socket.on("disconnect", () => {
    console.log(socket.disconnected); // true
});
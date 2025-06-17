const express = require("express");
const http = require("http");
const { setupSocketServer } = require("./server");
const cors = require('cors');


const app = express();
app.use(cors());
const server = http.createServer(app);

const PORT = process.env.SOCKET_PORT || 5000;

setupSocketServer(server);

server.listen(PORT, () => {
    console.log(`🧩 Socket.io server running on port ${PORT}`);
});

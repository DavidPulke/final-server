const { Server } = require("socket.io");

let io;

const setupSocketServer = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: '*', // תוכל לשים את הדומיין של הקליינט פה
            methods: ['GET', 'POST']
        }
    });

    io.on("connection", (socket) => {
        console.log("🟢 New client connected:", socket.id);

        // הצטרפות של משתמש לפי מזהה
        socket.on("join", (userId) => {
            socket.join(userId);
            console.log(`👤 User ${userId} joined room`);
        });

        // שליחת הודעה
        socket.on("send_message", ({ userId, message }) => {
            console.log(`📩 Message to ${userId}:`, message);
            io.to(userId).emit("receive_message", message);
        });

        socket.on("disconnect", () => {
            console.log("🔴 Client disconnected:", socket.id);
        });
    });
};

module.exports = { setupSocketServer };

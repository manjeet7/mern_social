const io = require("socket.io")(8800, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let activeUsers = [];

io.on("connection", (socket) => {
    socket.on("new-user-add", (newUserId) => {
        if (!activeUsers.some((users) => users.userId === newUserId)) {
            activeUsers.push({ userId: newUserId, socketId: socket.id });
        }
        console.log("active users ", activeUsers);
        io.emit("get-users", activeUsers);
    });
    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        io.emit("get-users", activeUsers);
    });
    socket.on("send-message", (data) => {
        const { recieverId } = data;
        const user = activeUsers.find((user) => user.userId === recieverId);
        console.log("reciever id ", recieverId);
        if (user) {
            io.to(user.socketId).emit("recieve-message", data);
        }
    });
});

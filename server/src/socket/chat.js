export const initChatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("💬 Chat connected:", socket.id);

    socket.on("join-room", (room) => {
      socket.join(room);
      console.log(`👥 ${socket.id} joined ${room}`);
    });

    socket.on("send-message", ({ room, user, text }) => {
      io.to(room).emit("receive-message", { user, text, time: new Date() });
    });
  });
};

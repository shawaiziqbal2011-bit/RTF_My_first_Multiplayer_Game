import { Server } from "socket.io";

const io = new Server({
  cors: { origin: "http://localhost:5173" },
});

io.listen(3001);

const generateRandomPosition = () => {
  return [Math.random() * 3, 0, Math.random() * 3];
};

const generateRandomHexColor = () => {
  // return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const characters = [];

io.on("connection", (socket) => {
  console.log("user connected");

  characters.push({
    id: socket.id,
    position: generateRandomPosition(),
    hairColor: generateRandomHexColor(),
    topColor: generateRandomHexColor(),
    bottomColor: generateRandomHexColor(),
  });

  socket.emit("hello");
  io.emit("characters", characters);

  socket.on("disconnect", () => {
    console.log("user disconnected");
    characters.splice(
      characters.findIndex((c) => c.id === socket.id),
      1,
    );
    io.emit("characters", characters);
  });
});

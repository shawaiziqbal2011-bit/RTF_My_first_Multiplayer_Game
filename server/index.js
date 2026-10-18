import { Server } from "socket.io";

const io = new Server({
  cors: { origin: "http://localhost:5173" },
});

io.listen(3001);

const generateRandomPosition = () => {
  //generate a random position in the x and z axis beween 0 and 3 and set the y axis to 0.
  return [Math.random() * 3, 0, Math.random() * 3];
};

const generateRandomHexColor = () => {
  // return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
  //generate a random hex color.
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};
//Characters array to store the characters connected to the server.
const characters = [];

io.on("connection", (socket) => {
  console.log("user connected");
  //Add the new player in the array of characters.
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
    //Remove the charecter from the characters array when the user disconnects and emit the updated characters array to all players.
    characters.splice(
      characters.findIndex((c) => c.id === socket.id),
      1,
    );
    io.emit("characters", characters);
  });

  socket.on("move", (position) => {
    console.log("Received position:", position);
    //Find the character with the matching socket id and update its position.
    const character = characters.find((c) => c.id === socket.id);
    character.position = position;
    io.emit("characters", characters);
  });
});

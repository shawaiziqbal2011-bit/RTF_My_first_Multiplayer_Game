import { io } from "socket.io-client";
import { useEffect } from "react";
import { useAtom, atom } from "jotai";

// export const socket = io("http://localhost:3001");

export const charactersAtom = atom([]);
export const ScocketManager = () => {
  const [_characters, setCharacters] = useAtom(charactersAtom);

  useEffect(() => {
    const socket = io("http://localhost:3001");

    const onConnect = () => {
      console.log("user connected");
    };

    const onDisconnect = () => {
      console.log("user disconnected");
    };

    const onHello = () => {
      console.log("hello from server");
    };

    const onCharacters = (value) => {
      setCharacters(value);
      console.log("characters", value);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("hello", onHello);
    socket.on("characters", onCharacters);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("hello", onHello);
    };
  }, []);

  return null;
};

import { io } from "socket.io-client";
import { useEffect } from "react";
import { useAtom, atom } from "jotai";

//socket setup on client side.

export const socket = io("http://localhost:3001", {
  autoConnect: false,
});

export const charactersAtom = atom([]);
export const userAtom = atom(null);
export const mapAtom = atom(null);

export const ScocketManager = () => {
  const [_characters, setCharacters] = useAtom(charactersAtom);
  const [_map, setMap] = useAtom(mapAtom);
  const [_user, setUser] = useAtom(userAtom);

  useEffect(() => {
    console.log("this is map", _map);
  }, [_map]);

  useEffect(() => {
    const onConnect = () => {
      console.log("user connected");
    };

    const onDisconnect = () => {
      console.log("user disconnected");
    };

    const onHello = (data) => {
      console.log("hello from server", data);

      setMap(data?.map);
      setUser(data?.id);
      setCharacters(data?.characters);
    };

    const onCharacters = (data) => {
      console.log("characters data:", data);
      setCharacters(data);
      // setCharacters(Array.isArray(data) ? data : data.characters);

      // if (data?.map) {
      //   setMap(data?.map);
      // }
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("hello", onHello);
    socket.on("characters", onCharacters);

    socket.connect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("hello", onHello);
      socket.off("characters", onCharacters); // Add this
    };
  }, []);

  return null;
};

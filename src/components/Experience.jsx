import { Environment, OrbitControls, useCursor } from "@react-three/drei";
import { AnimatedWoman } from "./AnimateWoman";
import {
  charactersAtom,
  mapAtom,
  ScocketManager,
  socket,
} from "./SocketManagerr";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import * as Three from "three";
import { Item } from "./item";

export const Experience = () => {
  const [characters] = useAtom(charactersAtom);
  const [onFloor, setOnFloor] = useState(false);
  const [map] = useAtom(mapAtom);
  useCursor(onFloor);

  return (
    <>
      <ScocketManager />
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <OrbitControls />

      {map?.items?.map((value, index) => (
        <Item
          key={`${value.name}-${index}`}
          item={value}
          gridDivision={map.gridDivision}
          mapSize={map.size}
        />
      ))}

      <mesh
        //Math.PI / 2 means rotate 90 degrees hai.
        rotation-x={-Math.PI / 2}
        receiveShadow
        //move floor down a little bit so that it doesn't interact with the characters feet.
        position-y={-0.001}
        //send the click event to the server with the x and z coordinates of the click position.
        onClick={(e) => socket.emit("move", [e.point.x, 0, e.point.z])}
        onPointerEnter={() => setOnFloor(true)}
        onPointerLeave={() => setOnFloor(false)}
        // position-x={map?.size[0] / 2}
        // position-z={map?.size[1] / 2}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {characters.map((character, index) => (
        <AnimatedWoman
          key={character?.id}
          //Three.Vector is used to create a new vector with the x,y,z coordinates of the characters position.
          position={
            new Three.Vector3(
              character?.position[0],
              character?.position[1],
              character?.position[2],
            )
          }
          hairColor={character?.hairColor}
          topColor={character?.topColor}
        />
      ))}
    </>
  );
};

import { Environment, OrbitControls, useCursor } from "@react-three/drei";
import { AnimatedWoman } from "./AnimateWoman";
import { charactersAtom, ScocketManager, socket } from "./SocketManagerr";
import { useAtom } from "jotai";
import { useState } from "react";
import * as Three from "three";

export const Experience = () => {
  const [characters] = useAtom(charactersAtom);
  const [onFloor, setOnFloor] = useState(false);
  useCursor(onFloor);

  return (
    <>
      <ScocketManager />
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <OrbitControls />

      <mesh
        rotation-x={-Math.PI / 2}
        receiveShadow
        position-y={-0.001}
        onClick={(e) => socket.emit("move", [e.point.x, 0, e.point.z])}
        onPointerEnter={() => setOnFloor(true)}
        onPointerLeave={() => setOnFloor(false)}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {characters.map((character, index) => (
        <AnimatedWoman
          key={character?.id}
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

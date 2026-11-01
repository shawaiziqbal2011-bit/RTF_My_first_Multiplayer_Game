import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";

export const Item = ({ item, gridDivision, mapSize }) => {
  const { name, gridPosition, size, rotation } = item;

  const { scene } = useGLTF(`/models/items/${name}.glb`);

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  const position = [
    (size[0] / 2 + gridPosition[0]) / gridDivision - mapSize[0] / 2,
    0,
    (size[1] / 2 + gridPosition[1]) / gridDivision - mapSize[1] / 2,
  ];

  return (
    <primitive
      object={clone}
      position={position}
      rotation-y={-((rotation || 0) * Math.PI) / 2}
    />
  );
};

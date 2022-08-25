import {useGLTF} from "@react-three/drei";
import {useFrame, Vector3} from "@react-three/fiber";
import {useState} from "react";
import {Euler} from "three";

export default function WorldObject(props: JSX.IntrinsicElements['group'] & {
  geometryName: string,
  materialName: string,
  worldPosition: Vector3,
  autoRotate: boolean,
}) {

  // @ts-ignore
  const {nodes, materials} = useGLTF('models/tiles01.glb');

  const [rotation, setRotation] = useState(0);

  useFrame((state, delta) => {
    if (props.autoRotate) {
      setRotation((rotation) => rotation + delta);
    }
  });

  return (
      <group {...props} position={props.worldPosition} rotation={new Euler(0, rotation, 0)} dispose={null}>
        <mesh
            castShadow={true}
            receiveShadow={true}
            geometry={nodes[props.geometryName].geometry}
            material={materials[props.materialName]}
            position={[0, 0, 0]}>
        </mesh>
      </group>
  );
}

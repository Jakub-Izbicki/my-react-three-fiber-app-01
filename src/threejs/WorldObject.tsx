import {TransformControls, useGLTF, useHelper} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {createRef, useRef, useState} from "react";
import {Box3Helper, BoxHelper, Euler, Vector3, Group, SkeletonHelper} from "three";
import {degToRad} from "three/src/math/MathUtils";

export interface GeoAndMaterial {
  geometryName: string,
  materialName: string,
}

export default function WorldObject(props: {
  geosAndMaterials: GeoAndMaterial[],
  position: Vector3,
  rotation?: Vector3,
  autoRotate?: boolean,
}) {

  // @ts-ignore
  const {nodes, materials} = useGLTF('models/tiles01.glb');

  const [rotation, setRotation] = useState(0);

  useFrame((state, delta) => {
    if (props.autoRotate) {
      setRotation((rotation) => rotation + delta);
    }
  });

  const rootRef = createRef<Group>();

  // useHelper(rootRef, BoxHelper);

  return (
      <>
        <group {...props}
               ref={rootRef}
               position={props.position}
               rotation={props.autoRotate ? new Euler(0, rotation, 0) : props.rotation ? new Euler(degToRad(props.rotation.x), degToRad(props.rotation.y), degToRad(props.rotation.z)) : new Euler(0, 0, 0)}
               dispose={null}>
          {
            props.geosAndMaterials.map(data => {
              return (
                  <mesh key={`${data.geometryName}-${data.materialName}`}
                        castShadow={true}
                        receiveShadow={true}
                        geometry={nodes[data.geometryName].geometry}
                        material={materials[data.materialName]}
                        position={[0, 0, 0]}>
                  </mesh>)
            })
          }
        </group>
        {/*<TransformControls object={rootRef} translationSnap={0.5}/>*/}
      </>
  );
}

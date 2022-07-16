import './ThreeJsContainer.css';
import {useRef, useState} from "react";
import {Canvas, ThreeEvent, useFrame} from "@react-three/fiber";
import * as THREE from 'three';

// @ts-ignore
const cartesianProduct = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

export default function ThreeJsContainer() {
  let sideSize = 2;

  const boxes = cartesianProduct([...Array(sideSize).keys()], [...Array(sideSize).keys()])
    .map((values: [number, number]) => new THREE.Vector3(values[0], values[1], 0))
    .map((v: THREE.Vector3) => (<Box position={v} key={`${v.x}:${v.y}:${v.z}`}/>));

  return (
      <div className={'master-container'}>
        <Canvas>
          <ambientLight/>
          <pointLight position={[10, 10, 10]}/>
          {boxes}
        </Canvas>
      </div>
  );
}

export function Box(props: JSX.IntrinsicElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!);

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const onPointerOverOut = (event: ThreeEvent<PointerEvent>, isOver: boolean) => {
    event.stopPropagation();
    setHovered(isOver);
  }

  const onClick = (event: ThreeEvent<MouseEvent>, clicked: boolean) => {
    event.stopPropagation();
    setClicked(clicked)
  }

  useFrame((state, delta) => (ref.current.rotation.x += 0.01));

  return (
      <mesh
          {...props}
          ref={ref}
          scale={clicked ? 1.5 : 1}
          onClick={(event) => onClick(event, !clicked)}
          onPointerOver={(event) => onPointerOverOut(event, true)}
          onPointerOut={(event) => onPointerOverOut(event, false)}>
        <boxGeometry args={[1, 1, 1]}/>
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'}/>
      </mesh>
  );
}

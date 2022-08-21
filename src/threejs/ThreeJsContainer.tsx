import './ThreeJsContainer.css';
import {useRef, useState} from "react";
import {Canvas, ThreeEvent, useFrame, useLoader} from "@react-three/fiber";
import * as THREE from 'three';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Environment, MapControls, OrbitControls, OrthographicCamera, useGLTF} from "@react-three/drei";
import PostProcessingEffects from "./PostProcessingEffects";

// @ts-ignore
const cartesianProduct = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

export default function ThreeJsContainer() {
  let sideSize = 1;

  const boxes = cartesianProduct([...Array(sideSize).keys()], [...Array(sideSize).keys()])
    .map((values: [number, number]) => new THREE.Vector3(values[0], values[1], 0))
    .map((v: THREE.Vector3) => (<Box position={v} key={`${v.x}:${v.y}:${v.z}`}/>));

  return (
      <div className={'master-container'}>
        <Canvas shadows={true}>
          {/*<color attach="background" args={['#000000']} />*/}
          {/*<hemisphereLight intensity={0.2} color="#eaeaea" groundColor="blue" />*/}
          {/*<Environment preset="city"/>*/}
          {/*<hemisphereLight intensity={0.1} />*/}
          <ambientLight intensity={0.1}/>
          <pointLight position={[0, 1000, 0]} intensity={0.3}/>
          <directionalLight castShadow={true} intensity={0.8} shadow-mapSize={[1024, 1024]} shadow-bias={-0.0001} position={[-10, 10, 5]} />
          {/*<directionalLight position={[-10, 10, 5]}  castShadow={true}/>*/}
          <OrthographicCamera makeDefault far={100} near={0.1} position={[-10, 10, -10]} zoom={200} />
          <MapControls screenSpacePanning={true} enableDamping={false}/>
          <PostProcessingEffects/>

          {/*{boxes}*/}
          <TileColumn/>
          <Ground/>
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

  // useFrame((state, delta) => (ref.current.rotation.x += 0.01));

  return (
      <mesh
          {...props}
          castShadow={true}
          receiveShadow={true}
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

function Ground(props: JSX.IntrinsicElements['mesh']) {
  return (
      <mesh
          {...props}
          castShadow={true}
          receiveShadow={true}
          position={[0, -0.05, 0]}>
        <boxGeometry args={[15, 0.1, 15]}/>
        <meshStandardMaterial color={'grey'}/>
      </mesh>
  );
}

function TileColumn(props: JSX.IntrinsicElements['group']) {
  const tiles01 = useGLTF('models/tiles01.glb');

  return (
      <group {...props} dispose={null}>
        <mesh
            castShadow={true}
            receiveShadow={true}
            geometry={tiles01.nodes.Cube.geometry}
            material={tiles01.materials["Material.010"]}
            position={[0, 0.5, 0]}>
          {/*<meshStandardMaterial color={'hotpink'}/>*/}
        </mesh>
      </group>
  );
}

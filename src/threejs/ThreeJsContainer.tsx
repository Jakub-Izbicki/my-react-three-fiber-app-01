import './ThreeJsContainer.css';
import {useRef, useState} from "react";
import {Canvas, ThreeEvent, useFrame, useLoader} from "@react-three/fiber";
import * as THREE from 'three';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Edges, Environment, MapControls, OrbitControls, OrthographicCamera, useGLTF} from "@react-three/drei";
import PostProcessingEffects from "./PostProcessingEffects";
import {Euler, Vector3} from "three";
import WorldObject from "./WorldObject";

// @ts-ignore
const cartesianProduct = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

export default function ThreeJsContainer() {
  let sideSize = 10;

  // const boxes = cartesianProduct([...Array(sideSize).keys()], [...Array(sideSize).keys()])
  //   .map((values: [number, number]) => new THREE.Vector3(values[0], values[1], 0))
  //   .map((v: THREE.Vector3) => (<Box position={v} key={`${v.x}:${v.y}:${v.z}`}/>));
  //
  // const dirtTiles = cartesianProduct([...Array(sideSize).keys()], [...Array(sideSize).keys()])
  // .map((values: [number, number]) => [values[0] - sideSize / 2, values[1] - sideSize / 2 ])
  // .map((values: [number, number]) => new THREE.Vector3(values[0], 0, values[1]))
  // .map((v: THREE.Vector3) => (<TileDirt position={v} key={`${v.x}:${v.y}:${v.z}`}/>));

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
          {/*<TileColumn/>*/}
          <WorldObject geometryName={'column01'} materialName={'grayStone01'} worldPosition={new Vector3(0, 0, 0)} autoRotate={false}/>
          <WorldObject geometryName={'sphere'} materialName={'sphere01'} worldPosition={new Vector3(-1.2, 1, 0.5)} autoRotate={true}/>
          {/*{dirtTiles}*/}
          <Ground/>
        </Canvas>
      </div>
  );
}

function Ground(props: JSX.IntrinsicElements['mesh']) {
  return (
      <mesh
          {...props}
          castShadow={true}
          receiveShadow={true}
          position={[0, -0.05, 0]}>
        <boxGeometry args={[25, 0.1, 25]}/>
        <meshStandardMaterial color={'gray'}/>
      </mesh>
  );
}

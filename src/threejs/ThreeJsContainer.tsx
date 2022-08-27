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
          <OrthographicCamera makeDefault={true} far={100} near={0.1} position={[-10, 10, -10]} zoom={200} />
          <MapControls makeDefault={true} screenSpacePanning={true} enableDamping={false}/>
          <PostProcessingEffects/>

          {/*{boxes}*/}
          {/*<TileColumn/>*/}
          <WorldObject geosAndMaterials={[{ geometryName: 'column01', materialName: 'grayStone01'}]} position={new Vector3(0, 0, 0)}/>
          <WorldObject geosAndMaterials={[{ geometryName: 'sphere', materialName: 'sphere01'}]} position={new Vector3(-1.2, 1, 0.5)} autoRotate={true}/>
          <WorldObject geosAndMaterials={[{ geometryName: 'stoneWall01_1', materialName: 'grayStone01'}, { geometryName: 'stoneWall01_2', materialName: 'brownStone01'}]} position={new Vector3(-3, 0, 0)}/>
          <WorldObject geosAndMaterials={[{ geometryName: 'stoneWall01_1', materialName: 'grayStone01'}, { geometryName: 'stoneWall01_2', materialName: 'brownStone01'}]} position={new Vector3(-4, 0, 0)}/>
          {/*<WorldObject geosAndMaterials={[{ geometryName: 'stoneWall01_1', materialName: 'grayStone01'}, { geometryName: 'stoneWall01_2', materialName: 'brownStone01'}]} position={new Vector3(-5, 0, 0)}/>*/}
          <WorldObject geosAndMaterials={[{ geometryName: 'stoneWall01_1', materialName: 'grayStone01'}, { geometryName: 'stoneWall01_2', materialName: 'brownStone01'}]} position={new Vector3(-3, 0, -1)}/>
          <WorldObject geosAndMaterials={[{ geometryName: 'stoneWall01_1', materialName: 'grayStone01'}, { geometryName: 'stoneWall01_2', materialName: 'brownStone01'}]} position={new Vector3(-4, 0, -1)}/>
          {/*<WorldObject geosAndMaterials={[{ geometryName: 'stoneWall01_1', materialName: 'grayStone01'}, { geometryName: 'stoneWall01_2', materialName: 'brownStone01'}]} position={new Vector3(-5, 0, -1)}/>*/}
          <WorldObject geosAndMaterials={[{ geometryName: 'stoneWallFlank01', materialName: 'grayStone01'}]} position={new Vector3(-3, 1, 0)}/>
          <WorldObject geosAndMaterials={[{ geometryName: 'stoneWallFlank01', materialName: 'grayStone01'}]} position={new Vector3(-3, 1, 0)} rotation={new Vector3(0,90, 0)}/>
          <WorldObject geosAndMaterials={[{ geometryName: 'stoneWallFlank01', materialName: 'grayStone01'}]} position={new Vector3(-4, 1, 0)}/>
          <WorldObject geosAndMaterials={[{ geometryName: 'stoneWallFlank01', materialName: 'grayStone01'}]} position={new Vector3(-5, 1, 0)}/>
          <WorldObject geosAndMaterials={[{ geometryName: 'stoneWallFlank01', materialName: 'grayStone01'}]} position={new Vector3(-5, 1, 0)} rotation={new Vector3(0,-90, 0)}/>
          <WorldObject geosAndMaterials={[{ geometryName: 'stoneWallFlank01', materialName: 'grayStone01'}]} position={new Vector3(-3, 1, -1)} rotation={new Vector3(0,180, 0)}/>
          <WorldObject geosAndMaterials={[{ geometryName: 'stoneWallFlank01', materialName: 'grayStone01'}]} position={new Vector3(-3, 1, -1)} rotation={new Vector3(0,90, 0)}/>
          <WorldObject geosAndMaterials={[{ geometryName: 'stoneWallFlank01', materialName: 'grayStone01'}]} position={new Vector3(-4, 1, -1)} rotation={new Vector3(0,180, 0)}/>
          <WorldObject geosAndMaterials={[{ geometryName: 'stoneWallFlank01', materialName: 'grayStone01'}]} position={new Vector3(-5, 1, -1)} rotation={new Vector3(0,180, 0)}/>
          <WorldObject geosAndMaterials={[{ geometryName: 'stoneWallFlank01', materialName: 'grayStone01'}]} position={new Vector3(-5, 1, -1)} rotation={new Vector3(0,-90, 0)}/>
          <WorldObject geosAndMaterials={[{ geometryName: 'stoneWallArch01', materialName: 'grayStone01'}]} position={new Vector3(-5, 0, -1)} rotation={new Vector3(0,180, 0)}/>
          <WorldObject geosAndMaterials={[{ geometryName: 'stoneWallArch01', materialName: 'grayStone01'}]} position={new Vector3(-5, 0, 0)} rotation={new Vector3(0,0, 0)}/>

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

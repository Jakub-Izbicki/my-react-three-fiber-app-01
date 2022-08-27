import {PixelShader, ShaderPass, SSAOPass} from "three-stdlib"
import {extend, useFrame, useThree} from "@react-three/fiber";
import {Effects} from "@react-three/drei";
import {useMemo, useState} from "react";
import {RenderPixelatedPass} from "./RenderPixelatedPass";
import {Vector2} from "three";

extend({SSAOPass, ShaderPass, RenderPixelatedPass});

// creates a pixelated screen effect, with highlighted edges/cavities
export default function PostProcessingEffects() {
  const {size, camera, scene} = useThree();
  const [zoom, setZoom] = useState(camera.zoom);

  useFrame(() => {
    if (zoom !== camera.zoom) {
      setZoom(camera.zoom);
    }
  })

  const pixelSize = useMemo(() => {
    // arbitrary value, defining how pixelated things are
    const pixelationFactor = 40;

    const size = Math.floor(zoom / pixelationFactor);
    return size >= 1 ? size : 1;
  }, [zoom]);

  return (
      <Effects multisamping={8} renderIndex={1} disableGamma={false} disableRenderPass={false} disableRender={false}>
        {/*<shaderPass args={[PixelShader]} uniforms-pixelSize-value={pixelSize} uniforms-resolution-value={[size.width, size.height]}/>*/}
        <renderPixelatedPass args={[new Vector2(size.width, size.height), pixelSize, scene, camera]}/>
      </Effects>
  );
}


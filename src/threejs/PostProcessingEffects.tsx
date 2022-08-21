import {PixelShader, ShaderPass, SSAOPass} from "three-stdlib"
import {extend, useFrame, useThree} from "@react-three/fiber";
import {Effects} from "@react-three/drei";
import {useMemo, useState} from "react";

extend({SSAOPass, ShaderPass});

// creates a pixelated screen effect
export default function PostProcessingEffects() {
  const {size, camera} = useThree();
  const [zoom, setZoom] = useState(camera.zoom);

  useFrame(() => {
    if (zoom !== camera.zoom) {
      setZoom(camera.zoom);
    }
  })

  const pixelSize = useMemo(() => {
    // arbitrary value, defining how pixelated things are
    const pixelationFactor = 50;

    const size = Math.floor(zoom / pixelationFactor);
    return size >= 1 ? size : 1;
  }, [zoom]);

  return (
      <Effects multisamping={8} renderIndex={1} disableGamma={false} disableRenderPass={false} disableRender={false}>
        <shaderPass args={[PixelShader]} uniforms-pixelSize-value={pixelSize} uniforms-resolution-value={[size.width, size.height]}/>
      </Effects>
  );
}


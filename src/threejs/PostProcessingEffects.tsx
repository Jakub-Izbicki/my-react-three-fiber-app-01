import {SSAOPass, ShaderPass, PixelShader, WaterRefractionShader} from "three-stdlib"
import {extend, useThree} from "@react-three/fiber";

import {Effects} from "@react-three/drei";

extend({SSAOPass, ShaderPass});

export default function PostProcessingEffects() {
  const {size} = useThree();

  return (
      <Effects multisamping={8} renderIndex={1} disableGamma={false} disableRenderPass={false} disableRender={false}>
        <shaderPass args={[PixelShader]} uniforms-pixelSize-value={4} uniforms-resolution-value={[size.width, size.height]}/>
      </Effects>
  );
}


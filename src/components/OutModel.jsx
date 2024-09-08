import React from 'react'
import {Canvas} from '@react-three/fiber'
import {useGLTF,PresentationControls,Stage} from '@react-three/drei'

function Model(props){ 
  const {scene} = useGLTF('./bitcoin.glb')
  return <primitive object={scene} {...props} /> 
}

function OutModel() {
  return (
    <div style={{height: '100vh', backgroundColor: '#101010'}}>
      <Canvas dpr={[1,2]} shadows camera={{fov:45}} style={{ top:'8%'}}>
        <color attach ='background' args={['#101010']} />
        <ambientLight intensity={-1} />

        <PresentationControls speed={1.5} global zoom ={.5} polar={[-0.1,Math.PI / 4]}>
         <Stage environment={null} >
          <Model scale={0.01}/>
         </Stage>
         </PresentationControls>
       </Canvas>
    </div>
  )
}

export default OutModel

// for 3d model install react three fiber , react three drei, npm three js


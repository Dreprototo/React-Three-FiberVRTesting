import { Plane } from "@react-three/drei";
import { usePlane } from "@react-three/cannon";

function VRPlane(){
    const [floorRef] = usePlane(() => ({
        args: [10, 10],
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, 0, 0],
        type: 'Static'
      }))
    return (
        <Plane ref={floorRef} args={[10, 10]} receiveShadow>
            <meshStandardMaterial attach="material" color="#f0dc07" roughness={0} metalness={1}/>
        </Plane>
    )
}

export default VRPlane;
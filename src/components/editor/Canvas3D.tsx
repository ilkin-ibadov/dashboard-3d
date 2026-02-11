import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import { useObjectsStore } from '../../store/objects.store'
import { useDesignersStore } from '../../store/designers.store'
import { SceneObjectComponent } from './SceneObject'

function ClickPlane() {
  const add = useObjectsStore((s) => s.add)
  const select = useObjectsStore((s) => s.select)
  const designers = useDesignersStore((s) => s.designers)
  const selectedDesigner = designers[0]?.id

  const handleDoubleClick = (e: any) => {
    e.stopPropagation()
    if (!selectedDesigner) return

    const point = e.point

    add({
      name: 'Box',
      designerId: selectedDesigner,
      color: '#4f46e5',
      position: [point.x, point.y, 0],
      size: 'normal',
      type: 'box',
    })
    select(null)
  }

  return (
    <mesh onDoubleClick={handleDoubleClick} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial visible={false} />
    </mesh>
  )
}

export function Canvas3D() {
  const objects = useObjectsStore((s) => s.objects)

  return (
    <Canvas camera={{ position: [10, 10, 10], fov: 50 }} className="h-full w-full">
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <Grid args={[10, 10]} cellSize={1} cellThickness={1} sectionSize={5} sectionThickness={1.5} fadeDistance={30} />

      <ClickPlane />

      {objects.map((obj) => (
        <SceneObjectComponent key={obj.id} object={obj} />
      ))}

      <OrbitControls makeDefault />
    </Canvas>
  )
}

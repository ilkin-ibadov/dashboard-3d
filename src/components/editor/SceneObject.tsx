import { useRef, useState, type JSX } from 'react'
import { Mesh } from 'three'
import type { ThreeEvent } from '@react-three/fiber'
import type { SceneObject } from '../../models/object3d'
import { useObjectsStore } from '../../store/objects.store'
import { sizeToScale } from './objectSize'
import { useGLTF } from '@react-three/drei'

interface Props {
  object: SceneObject
}

export function SceneObjectComponent({ object }: Props) {
  const meshRef = useRef<Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)
  const { selectedId, select, update } = useObjectsStore()
  const isSelected = selectedId === object.id

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    select(object.id)
    setDragging(true)
  }

  const handlePointerUp = () => setDragging(false)
  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging) return
    e.stopPropagation()
    update(object.id, { position: [e.point.x, e.point.y, object.position[2]] })
  }

  let geometry: JSX.Element
  if (object.type === 'custom' && object.modelUrl) {
    const { scene } = useGLTF(object.modelUrl)
    geometry = <primitive object={scene} />
  } else {
    switch (object.type) {
      case 'sphere':
        geometry = <sphereGeometry args={[0.5, 32, 32]} />
        break
      case 'cone':
        geometry = <coneGeometry args={[0.5, 1, 32]} />
        break
      case 'cylinder':
        geometry = <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
        break
      default:
        geometry = <boxGeometry />
    }
  }

  return (
    <mesh
      ref={meshRef}
      position={object.position}
      scale={sizeToScale(object.size)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      {geometry}
      <meshStandardMaterial
        color={isSelected ? 'orange' : hovered ? 'hotpink' : object.color}
      />
    </mesh>
  )
}

import { useRef, useState, useEffect } from 'react'
import { Group } from 'three'
import type { ThreeEvent } from '@react-three/fiber'
import { useGLTF, useKeyboardControls } from '@react-three/drei'
import type { SceneObject } from '../../models/object3d'
import { useObjectsStore } from '../../store/objects.store'
import { sizeToScale } from '../../utils/objectSize'
import { Controls } from '../../hooks/useEditorKeyboard'

interface Props {
  object: SceneObject
}

export function SceneObjectComponent({ object }: Props) {
  const [sub, get] = useKeyboardControls<Controls>()
  const groupRef = useRef<Group>(null!)
  const [hovered, setHovered] = useState(false)

  const { select, selectedId, update, draggingId, setDragging } = useObjectsStore()
  const isDragging = draggingId === object.id
  const isSelected = selectedId === object.id


  // dragging behaviour
  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    select(object.id)
    setDragging(object.id)
  }

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setDragging(null)
  }

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isDragging) return

    const state = get()
    const isKeyboardActive = state.forward || state.back || state.left || state.right

    if (isKeyboardActive) return // skips drag while arrow keys are pressed

    e.stopPropagation()
    update(object.id, {
      position: [e.point.x, e.point.y, object.position[2]] as [number, number, number],
    })
  }

  // when external 3d model is uploaded
  if (object.type === 'custom') {
    if (!object.modelBase64) return null

    const { scene } = useGLTF(object.modelBase64)

    // Apply hover/select color for uploaded models
    useEffect(() => {
      scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material = child.material.clone()
          child.material.color.set(
            isSelected ? 'orange' : hovered ? 'hotpink' : object.color
          )
        }
      })
    }, [scene, hovered, isSelected, object.color])

    return (
      <group
        ref={groupRef}
        position={object.position}
        scale={sizeToScale(object.size)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        <primitive object={scene} />
      </group>
    )
  }

  // Default cube
  return (
    <mesh
      position={object.position}
      scale={sizeToScale(object.size)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      {object.type === 'box' && <boxGeometry />}
      <meshStandardMaterial
        color={isSelected ? 'orange' : hovered ? 'hotpink' : object.color}
      />
    </mesh>
  )
}

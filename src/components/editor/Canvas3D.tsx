import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import { useObjectsStore } from '../../store/objects.store'
import { useDesignersStore } from '../../store/designers.store'
import { SceneObjectComponent } from './SceneObject'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { Controls } from '../../hooks/useEditorKeyboard'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'

const MOVE_STEP = 0.2

function ClickPlane() {
  const [sub, get] = useKeyboardControls<Controls>()
  const { selectedId, objects, update, remove, select, add, draggingId } = useObjectsStore()
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

  // arrow keys movement
  useFrame(({ camera }) => {
    if (!selectedId) return
    const obj = objects.find((o) => o.id === selectedId)
    if (!obj) return

    const state = get()
    const isKeyboardActive = state.forward || state.back || state.left || state.right
    if (!isKeyboardActive || draggingId === selectedId) return

    // camera-relative axes
    const camForward = new Vector3()
    camera.getWorldDirection(camForward)
    camForward.y = 0
    camForward.normalize()

    const camRight = new Vector3()
    camRight.crossVectors(camForward, camera.up).normalize()

    const moveDelta = new Vector3()
    if (state.forward) moveDelta.add(camForward)
    if (state.back) moveDelta.sub(camForward)
    if (state.right) moveDelta.add(camRight)
    if (state.left) moveDelta.sub(camRight)
    moveDelta.multiplyScalar(MOVE_STEP)

    const newPos: [number, number, number] = [
      obj.position[0] + moveDelta.x,
      obj.position[1] + moveDelta.y,
      obj.position[2] + moveDelta.z,
    ]
    update(selectedId, { position: newPos })
  })

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const unsubDelete = sub(
      (state) => state.delete,
      (pressed) => pressed && selectedId && remove(selectedId)
    )

    const unsubEscape = sub(
      (state) => state.escape,
      (pressed) => pressed && select(null)
    )

    return () => {
      unsubDelete()
      unsubEscape()
    }
  }, [sub, selectedId, remove, select])

  return (
    <mesh onDoubleClick={handleDoubleClick} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial visible={false} />
    </mesh>
  )
}

export function Canvas3D() {
  const orbitRef = useRef<any>(null)
  const objects = useObjectsStore((s) => s.objects)

  useEffect(() => {
    const unsub = useObjectsStore.subscribe(
      (state) => state.draggingId,
      (draggingId) => {
        if (orbitRef.current) orbitRef.current.enabled = draggingId === null
      }
    )
    return unsub
  }, [])

  return (
    <Canvas
      // onPointerMissed={() => useObjectsStore.getState().select(null)}
      camera={{ position: [10, 10, 10], fov: 50 }}
      className="h-full w-full">
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <Grid args={[10, 10]} cellSize={1} cellThickness={1} sectionSize={5} sectionThickness={1.5} fadeDistance={30} />

      <ClickPlane />

      {objects.map((obj) => (
        <SceneObjectComponent key={obj.id} object={obj} />
      ))}

      <OrbitControls ref={orbitRef} />
    </Canvas>
  )
}

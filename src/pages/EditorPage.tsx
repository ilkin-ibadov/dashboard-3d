import { useEffect } from 'react'
import { Canvas3D } from '../components/editor/Canvas3D'
import { useObjectsStore } from '../store/objects.store'
import { useDesignersStore } from '../store/designers.store'
import { ObjectInspector } from '../components/editor/ObjectInspector'
import { ModelUploader } from '../components/editor/ModelUploader'
import { DeleteSelectedButton } from '../components/editor/DeleteSelectedButton'
import { KeyboardControls } from '@react-three/drei'
import { useKeyboardMap } from '../hooks/useEditorKeyboard'

export function EditorPage() {
    const map = useKeyboardMap()
    const loadObjects = useObjectsStore((s) => s.load)
    const loadDesigners = useDesignersStore((s) => s.load)

    useEffect(() => {
        loadObjects()
        loadDesigners()
    }, [loadObjects, loadDesigners])

    return (
        <div className="w-full min-h-screen h-full flex">
            <div className="flex-1 bg-gray-100 relative">
                <p className='w-full pt-5 absolute text-center text-zinc-500'>Click to select, press ESC key to deselect, or DELETE key to remove the item <br /> Use arrow keys or drag to move the item</p>
                <KeyboardControls map={map}>
                    <Canvas3D />
                </KeyboardControls>
            </div>

            <aside className="w-80 border-l bg-white p-4 space-y-4">
                <ModelUploader />
                <ObjectInspector />
                <DeleteSelectedButton />
            </aside>
        </div>
    )
}

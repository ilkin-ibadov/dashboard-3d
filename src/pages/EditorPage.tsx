import { useEffect } from 'react'
import { Canvas3D } from '../components/editor/Canvas3D'
import { useObjectsStore } from '../store/objects.store'
import { useDesignersStore } from '../store/designers.store'
import { ObjectInspector } from '../components/editor/ObjectInspector'
import { ModelUploader } from '../components/editor/ModelUploader'

export function EditorPage() {
    const loadObjects = useObjectsStore((s) => s.load)
    const loadDesigners = useDesignersStore((s) => s.load)

    useEffect(() => {
        loadObjects()
        loadDesigners()
    }, [loadObjects, loadDesigners])

    return (
        <div className="w-full min-h-screen h-full flex">
            <div className="flex-1 bg-gray-100">
                <Canvas3D />
            </div>

            <aside className="w-80 border-l bg-white p-4 space-y-4">
                <ModelUploader />
                <ObjectInspector />
            </aside>
        </div>
    )
}

import { useObjectsStore } from '../../store/objects.store'
import { useDesignersStore } from '../../store/designers.store'
import type { ObjectSize } from '../../models/object3d'
import { useState, useEffect } from 'react'

export function ObjectInspector() {
  const { selectedId, objects, update } = useObjectsStore()
  const { designers } = useDesignersStore()

  const selectedObject = objects.find((o) => o.id === selectedId)

  const [name, setName] = useState('')
  const [designerId, setDesignerId] = useState<string | null>(null)
  const [color, setColor] = useState('#4f46e5')
  const [size, setSize] = useState<ObjectSize>('normal')

  // Sync local state when selection changes
  useEffect(() => {
    if (selectedObject) {
      setName(selectedObject.name)
      setDesignerId(selectedObject.designerId)
      setColor(selectedObject.color)
      setSize(selectedObject.size)
    }
  }, [selectedObject?.id])

  if (!selectedObject) {
    return <div className="text-gray-500">Select an object to edit</div>
  }

  const handleSave = () => {
    console.log(selectedObject.id, {
      name,
      designerId: designerId!,
      color,
      size,
    })
    update(selectedObject.id, {
      name,
      designerId: designerId!,
      color,
      size,
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded border border-gray-400 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Designer</label>
        <select
          value={designerId || ''}
          onChange={(e) => setDesignerId(e.target.value)}
          className="mt-1 block w-full p-2 rounded border border-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          {designers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.fullName}
            </option>
          ))}
        </select>
      </div>

      {selectedObject.type !== 'custom' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="mt-1 block w-16 h-10 border-0 p-0"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Size</label>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value as ObjectSize)}
          className="mt-1 block w-full p-2 rounded border border-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="small">Small</option>
          <option value="normal">Normal</option>
          <option value="large">Large</option>
        </select>
      </div>

      <button
        onClick={handleSave}
        className="mt-2 w-full bg-slate-800 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Save
      </button>
    </div>
  )
}

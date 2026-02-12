import { useState } from 'react'
import { useObjectsStore } from '../../store/objects.store'
import { useDesignersStore } from '../../store/designers.store'

export function ModelUploader() {
    const addObject = useObjectsStore((s) => s.add)
    const designers = useDesignersStore((s) => s.designers)
    const [error, setError] = useState<string | null>(null)
    const [selectedDesigner, setSelectedDesigner] = useState<string | null>(
        designers[0]?.id || null
    )

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return
        const file = e.target.files[0]

        if (!file.name.endsWith('.glb') && !file.name.endsWith('.gltf')) {
            setError('Only .glb or .gltf files are allowed')
            return
        }

        if (!selectedDesigner) {
            setError('Please select a designer first')
            return
        }

        const reader = new FileReader()

        reader.onload = async () => {
            const base64 = reader.result as string

            await addObject({
                name: file.name,
                designerId: selectedDesigner,
                color: '#ffffff',
                position: [0, 0, 0],
                size: 'normal',
                type: 'custom',
                modelBase64: base64,
            })

            setError(null)
        }

        reader.onerror = () => {
            setError('Failed to read file')
        }

        reader.readAsDataURL(file)
    }

    return (
        <div className="p-2 space-y-2 border rounded bg-white">
            <label className="block text-sm font-medium text-gray-700">Designer</label>

            <select
                className="w-full rounded p-2 border border-gray-400  focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={selectedDesigner || ''}
                onChange={(e) => setSelectedDesigner(e.target.value)}
            >
                {designers.map((d) => (
                    <option key={d.id} value={d.id}>
                        {d.fullName}
                    </option>
                ))}
            </select>

            <input
                type="file"
                accept=".glb,.gltf"
                onChange={handleFileUpload}
                className="mt-2 w-full p-2 bg-slate-300 rounded"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
}

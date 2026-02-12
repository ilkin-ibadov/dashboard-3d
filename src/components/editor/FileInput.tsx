import { useRef } from 'react'

interface FileInputProps {
    onFileSelect: (file: File) => void
}

export function FileInput({ onFileSelect }: FileInputProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    const openFilePicker = () => {
        inputRef.current?.click()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileSelect(e.target.files[0])
            e.target.value = '' // reset input
        }
    }

    return (
        <div className="flex items-center space-x-2">
            <input
                type="file"
                ref={inputRef}
                className="hidden"
                accept=".glb,.gltf"
                onChange={handleChange}
            />
            <input
                type="text"
                readOnly
                placeholder="Select a 3D model (.glb, .gltf)"
                className="flex-1 p-2 border rounded cursor-pointer placeholder:text-white placeholder:text-center bg-slate-800"
                onClick={openFilePicker}
            />
        </div>
    )
}

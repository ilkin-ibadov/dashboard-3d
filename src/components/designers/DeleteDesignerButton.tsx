import { useDesignersStore } from "../../store/designers.store"

export function DeleteDesignerButton({ selectedId }: { selectedId: string }) {
    const remove = useDesignersStore((s) => s.remove)

    if (!selectedId) return null

    return (
        <button
            onClick={() => remove(selectedId)}
            className="w-fit rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 hover:cursor-pointer transition"
        >
            Delete
        </button>
    )
}

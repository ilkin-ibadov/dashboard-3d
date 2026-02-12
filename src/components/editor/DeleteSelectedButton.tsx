import { useObjectsStore } from '../../store/objects.store'

export function DeleteSelectedButton() {
  const selectedId = useObjectsStore((s) => s.selectedId)
  const remove = useObjectsStore((s) => s.remove)

  if (!selectedId) return null

  return (
    <button
      onClick={() => remove(selectedId)}
      className="w-full rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
    >
      Delete selected object
    </button>
  )
}

import { useEffect } from 'react'
import { useDesignersStore } from '../../store/designers.store'
import { useObjectsStore } from '../../store/objects.store'

export function DesignerList() {
    const { designers, load: loadDesigners } = useDesignersStore()
    const { objects, load: loadObjects } = useObjectsStore()

    useEffect(() => {
        loadDesigners()
        loadObjects()
    }, [loadDesigners, loadObjects])

    if (!designers.length) {
        return <p className="p-4 text-gray-500">No designers added yet</p>
    }

    // Compute attached objects count dynamically
    const designersWithCount = designers.map((d) => {
        const count = objects.filter((o) => o.designerId === d.id).length
        return { ...d, attachedObjectsCount: count }
    })

    return (
        <ul className="space-y-2 p-4">
            {designersWithCount.map((d) => (
                <li
                    key={d.id}
                    className="flex justify-between items-center rounded border p-3 bg-white shadow-sm"
                >
                    <div>
                        <div className="font-medium">{d.fullName}</div>
                        <div className="text-sm text-gray-500">
                            {d.workingHours} hours
                        </div>
                    </div>
                    <div className="text-sm text-gray-400">
                        Attached objects: {d.attachedObjectsCount}
                    </div>
                </li>
            ))}
        </ul>
    )
}

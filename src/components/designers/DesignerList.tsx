import { useEffect } from 'react'
import { useDesignersStore } from '../../store/designers.store'
import { useObjectsStore } from '../../store/objects.store'
import { DeleteDesignerButton } from './DeleteDesignerButton'

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

    // Update attached objects count
    const designersWithCount = designers.map((d) => {
        const count = objects.filter((o) => o.designerId === d.id).length
        return { ...d, attachedObjectsCount: count }
    })

    return (
        <ul className="space-y-2">
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
                    <div className='flex items-center gap-3'>
                        <div className="text-sm text-gray-600">
                            Attached objects: {d.attachedObjectsCount}
                        </div>
                        <DeleteDesignerButton selectedId={d.id} />
                    </div>
                </li>
            ))}
        </ul>
    )
}

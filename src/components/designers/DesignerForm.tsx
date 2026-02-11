import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDesignersStore } from '../../store/designers.store'

const designerSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    workingHours: z.number().min(1).max(24, 'Hours must be 1-24'),
})

type DesignerFormValues = z.infer<typeof designerSchema>

export function DesignerForm() {
    const addDesigner = useDesignersStore((s) => s.add)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<DesignerFormValues>({
        resolver: zodResolver(designerSchema),
        defaultValues: {
            fullName: '',
            workingHours: 8,
        },
    })

    const onSubmit = async (data: DesignerFormValues) => {
        // Provide attachedObjectsCount default
        await addDesigner({
            fullName: data.fullName,
            workingHours: data.workingHours.toString(),
            attachedObjectsCount: 0,
        })
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-4 border rounded bg-white">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Full Name
                </label>
                <input
                    {...register('fullName')}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.fullName && (
                    <p className="text-red-500 text-sm">{errors.fullName.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Working Hours
                </label>
                <input
                    type="number"
                    {...register('workingHours', { valueAsNumber: true })}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.workingHours && (
                    <p className="text-red-500 text-sm">{errors.workingHours.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="mt-2 rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
            >
                Add Designer
            </button>
        </form>
    )
}

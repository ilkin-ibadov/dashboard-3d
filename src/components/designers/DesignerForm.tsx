import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDesignersStore } from '../../store/designers.store'

const workingHoursOptions = [
    { label: '9 AM - 5 PM', value: '9-17' },
    { label: '10 AM - 6 PM', value: '10-18' },
    { label: '11 AM - 7 PM', value: '11-19' },
    { label: '12 PM - 8 PM', value: '12-20' },
]

const designerSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    workingHours: z.enum(['9-17', '10-18', '11-19', '12-20']),
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
            workingHours: '9-17',
        }
    })

    const onSubmit = async (data: DesignerFormValues) => {
        // Provide attachedObjectsCount default
        await addDesigner({
            fullName: data.fullName,
            workingHours: data.workingHours,
            attachedObjectsCount: 0,
        })
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-4 border rounded bg-white">
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                </label>
                <input
                    id="fullName"
                    {...register('fullName')}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    placeholder="Enter designer full name"
                    className="mt-1 block w-full rounded border border-gray-400 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.fullName && (
                    <p id="fullName-error" className="text-red-500 text-sm">{errors.fullName.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="workingHours" className="block text-sm font-medium text-gray-700">
                    Working Hours
                </label>
                <select
                    id="workingHours"
                    aria-invalid={!!errors.workingHours}
                    aria-describedby={errors.workingHours ? "workingHours-error" : undefined}
                    {...register('workingHours')}
                    className="mt-1 block w-full rounded border border-gray-400 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                    {workingHoursOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
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

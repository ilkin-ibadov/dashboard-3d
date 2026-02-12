import { DesignerForm } from '../components/designers/DesignerForm'
import { DesignerList } from '../components/designers/DesignerList'

export function DesignersPage() {
    return (
        <div className="p-6 flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Add new designers</h2>

            <DesignerForm />

            <h2 className="text-2xl font-semibold">Available designers</h2>
            <DesignerList />
        </div>
    )
}

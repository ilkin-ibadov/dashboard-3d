import { DesignerForm } from '../components/designers/DesignerForm'
import { DesignerList } from '../components/designers/DesignerList'

export function DesignersPage() {
    return (
        <div className="p-6 flex flex-col gap-6">
            <h1 className="text-2xl font-semibold">Designers</h1>

            <DesignerForm />

            <DesignerList />
        </div>
    )
}

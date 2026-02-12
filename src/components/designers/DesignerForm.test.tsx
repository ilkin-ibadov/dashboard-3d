import { render, screen } from '@testing-library/react'
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { DesignerForm } from './DesignerForm'
import { useDesignersStore } from '../../store/designers.store'

// Mock zustand store
vi.mock('../../store/designers.store', () => ({
    useDesignersStore: vi.fn(),
}))

describe('DesignerForm', () => {
    const addDesignerMock = vi.fn()

    beforeEach(() => {
        (useDesignersStore as unknown as jest.Mock).mockReturnValue({
            add: addDesignerMock,
            designers: [],
        })
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    test('renders form fields with labels', () => {
        render(<DesignerForm />)
        expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Working Hours/i)).toBeInTheDocument()
    })

    test('shows validation error for short name', async () => {
        render(<DesignerForm />)
        const nameInput = screen.getByLabelText(/Full Name/i)
        const submitButton = screen.getByRole('button', { name: /Add Designer/i })

        await userEvent.type(nameInput, 'A')
        await userEvent.click(submitButton)

        expect(await screen.findByText(/Name must be at least 2 characters/i)).toBeInTheDocument()
        expect(addDesignerMock).not.toHaveBeenCalled()
    })

    test('submits valid form', async () => {
        render(<DesignerForm />)
        const nameInput = screen.getByLabelText(/Full Name/i)
        const hoursInput = screen.getByLabelText(/Working Hours/i)
        const submitButton = screen.getByRole('button', { name: /Add Designer/i })

        await userEvent.type(nameInput, 'Alice Johnson')
        await userEvent.clear(hoursInput)
        await userEvent.type(hoursInput, '8')
        await userEvent.click(submitButton)

        expect(addDesignerMock).toHaveBeenCalledWith({
            fullName: 'Alice Johnson',
            workingHours: '8',
            attachedObjectsCount: 0,
        })
    })
})

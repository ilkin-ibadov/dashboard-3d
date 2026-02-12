import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Designer } from '../models/designer'
import { designersApi } from '../api/mockApi'

interface DesignersState {
    designers: Designer[]
    isLoading: boolean
    load: () => Promise<void>
    add: (data: Omit<Designer, 'id'>) => Promise<void>
    remove: (id: string) => void
}

export const useDesignersStore = create<DesignersState>()(
    persist(
        (set, get) => ({
            designers: [],
            isLoading: false,

            load: async () => {
                set({ isLoading: true })
                // to be enabled when working with real API
                // const data = await designersApi.getAll()
                // set({ designers: data, isLoading: false })
                set({ designers: get().designers, isLoading: false })
            },

            add: async (data) => {
                const designer = await designersApi.create(data)
                set({ designers: [...get().designers, designer] })
            },

            remove: (id: string) => {
                set((state) => ({
                    designers: state.designers.filter((o) => o.id !== id)
                }))
            },
        }),
        {
            name: 'designers-store',
            partialize: (state) => ({
                designers: state.designers,
            }),
        }
    )
)

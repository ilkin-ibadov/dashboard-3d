import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SceneObject } from '../models/object3d'
import { objectsApi } from '../api/mockApi'

interface ObjectsState {
  objects: SceneObject[]
  selectedId: string | null
  isLoading: boolean

  load: () => Promise<void>
  add: (data: Omit<SceneObject, 'id'>) => Promise<void>
  update: (id: string, data: Partial<SceneObject>) => Promise<void>
  select: (id: string | null) => void
}

export const useObjectsStore = create<ObjectsState>()(
  persist(
    (set, get) => ({
      objects: [],
      selectedId: null,
      isLoading: false,

      load: async () => {
        set({ isLoading: true })
        // const data = await objectsApi.getAll()
        set({ objects: get().objects, isLoading: false })
      },

      add: async (data) => {
        const object = await objectsApi.create(data)
        set({ objects: [...get().objects, object] })
      },

      update: async (id, data) => {
        const updated = await objectsApi.update(id, data)
        set({
          objects: get().objects.map((o) =>
            o.id === id ? updated : o
          ),
        })
      },

      select: (id) => {
        set({ selectedId: id })
      },
    }),
    {
      name: 'objects-store',
      partialize: (state) => ({
        objects: state.objects,
      }),
    }
  )
)

import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import type { SceneObject } from '../models/object3d'
import { objectsApi } from '../api/mockApi'
import { __internal } from '../api/mockApi'

export interface ObjectsState {
  objects: SceneObject[]
  selectedId: string | null
  draggingId: string | null
  isLoading: boolean
  load: () => Promise<void>
  add: (data: Omit<SceneObject, 'id'>) => Promise<void>
  update: (id: string, data: Partial<SceneObject>) => Promise<void>
  remove: (id: string) => void
  setDragging: (id: string | null) => void
  select: (id: string | null) => void
}

export const useObjectsStore = create<ObjectsState>()(
  subscribeWithSelector(persist(
    (set, get) => ({
      objects: [],
      selectedId: null,
      isLoading: false,
      draggingId: null,

      load: async () => {
        set({ isLoading: true })
        const persistedObjects = get().objects

        // sync fake API with persisted Zustand
        __internal.setObjects(persistedObjects)

        set({ isLoading: false })
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

      remove: (id: string) => {
        set((state) => ({
          objects: state.objects.filter((o) => o.id !== id),
          selectedId: state.selectedId === id ? null : state.selectedId,
          draggingId: get().draggingId === id ? null : get().draggingId,
        }))
      },

      setDragging: (id: string | null) => set({ draggingId: id }),

      select: (id) => {
        set({ selectedId: id })
      },
    }),
    {
      name: 'objects-store',
      partialize: (state) => ({
        objects: state.objects.filter(
          (o) => o.type !== 'custom'
        ),
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.objects) {
          __internal.setObjects(state.objects)
        }
      },
    }
  )
  ))

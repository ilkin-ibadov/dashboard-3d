import { nanoid } from 'nanoid'
import type { Designer } from '../models/designer'
import type { SceneObject } from '../models/object3d'

let designers: Designer[] = []
let objects: SceneObject[] = []

const delay = (ms = 200) =>
    new Promise((resolve) => setTimeout(resolve, ms))

export const __internal = {
    setObjects(data: SceneObject[]) {
        objects = [...data]
    },
    setDesigners(data: Designer[]) {
        designers = [...data]
    },
}

export const designersApi = {
    async getAll(): Promise<Designer[]> {
        await delay()
        return [...designers]
    },

    async create(data: Omit<Designer, 'id'>): Promise<Designer> {
        await delay()
        const designer: Designer = {
            id: nanoid(),
            ...data,
        }
        designers.push(designer)
        return designer
    },
}

export const objectsApi = {
    async getAll(): Promise<SceneObject[]> {
        await delay()
        return [...objects]
    },

    async create(
        data: Omit<SceneObject, 'id'>
    ): Promise<SceneObject> {
        await delay()
        const object: SceneObject = {
            id: nanoid(),
            ...data,
        }
        objects.push(object)
        return object
    },

    async update(
        id: string,
        data: Partial<SceneObject>
    ): Promise<SceneObject> {
        await delay()
        const index = objects.findIndex((o) => o.id === id)
        if (index === -1) {
            throw new Error('Object not found')
        }

        objects[index] = {
            ...objects[index],
            ...data,
            id
        }

        return objects[index]
    },
}

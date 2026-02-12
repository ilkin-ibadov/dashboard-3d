export type ObjectSize = 'small' | 'normal' | 'large'
export type ObjectType = 'box' | 'sphere' | 'cone' | 'cylinder' | 'custom'

export interface SceneObject {
    id: string
    name: string
    designerId: string
    color: string
    position: [number, number, number]
    size: ObjectSize
    type: ObjectType
    modelBase64?: string
}

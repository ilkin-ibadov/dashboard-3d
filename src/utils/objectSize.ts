import type { ObjectSize } from '../models/object3d'

export function sizeToScale(size: ObjectSize): number {
    switch (size) {
        case 'small':
            return 0.5
        case 'large':
            return 1.5
        default:
            return 1
    }
}

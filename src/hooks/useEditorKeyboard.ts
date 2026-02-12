import { useMemo } from 'react'
import type { KeyboardControlsEntry } from '@react-three/drei'

export enum Controls {
    forward = 'forward',    // ArrowUp / W
    back = 'back',          // ArrowDown / S
    left = 'left',          // ArrowLeft / A
    right = 'right',        // ArrowRight / D
    delete = 'delete',      // Delete / Backspace
    escape = 'escape',      // Escape key
}

export const useKeyboardMap = () =>
    useMemo<KeyboardControlsEntry<Controls>[]>(() => [
        { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
        { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
        { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
        { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
        { name: Controls.delete, keys: ['Delete', 'Backspace'] },
        { name: Controls.escape, keys: ['Escape'] },
    ], [])

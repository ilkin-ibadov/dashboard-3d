import { useMemo } from 'react'
import type { KeyboardControlsEntry } from '@react-three/drei'

export enum Controls {
    forward = 'forward',    // ArrowUp 
    back = 'back',          // ArrowDown
    left = 'left',          // ArrowLeft
    right = 'right',        // ArrowRight
    delete = 'delete',      // Delete / Backspace
    escape = 'escape',      // Escape key
}

export const useKeyboardMap = () =>
    useMemo<KeyboardControlsEntry<Controls>[]>(() => [
        { name: Controls.forward, keys: ['ArrowUp'] },
        { name: Controls.back, keys: ['ArrowDown'] },
        { name: Controls.left, keys: ['ArrowLeft'] },
        { name: Controls.right, keys: ['ArrowRight'] },
        { name: Controls.delete, keys: ['Delete', 'Backspace'] },
        { name: Controls.escape, keys: ['Escape'] },
    ], [])

import type { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary'
}

export function Button({
    variant = 'primary',
    className,
    ...props
}: Props) {
    return (
        <button
            {...props}
            className={clsx(
                'rounded px-4 py-2 text-sm font-medium transition',
                variant === 'primary' &&
                'bg-blue-600 text-white hover:bg-blue-700',
                variant === 'secondary' &&
                'border bg-white hover:bg-gray-50',
                className
            )}
        />
    )
}

export function formatWorkingHours(range: string) {
    const [start, end] = range.split('-').map(Number)
    const formatHour = (hour: number) =>
        hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`
    return `${formatHour(start)} - ${formatHour(end)}`
}

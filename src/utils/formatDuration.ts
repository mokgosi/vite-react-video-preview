const FORMAT_LEADING_ZERO = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
})

export function formatDuration(duration: number): string {
    const hours = Math.floor(duration / 60 / 60)
    const minutes = Math.floor((duration - hours * 60 * 60)/60)
    const seconds = duration % 60
    if (hours > 0) {
       return `${hours}:${FORMAT_LEADING_ZERO.format(minutes)}:${FORMAT_LEADING_ZERO.format(seconds)}`
    }

    return `${minutes}: ${FORMAT_LEADING_ZERO.format(seconds)}`
}
const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: 'auto'
})

const DIVISIONS: {
    amount: number; time_divison_name:Intl.RelativeTimeFormatUnit
}[] = [
    {amount: 60, time_divison_name: "seconds"},
    {amount: 60, time_divison_name: "minutes"},
    {amount: 24, time_divison_name: "hours"},
    {amount: 7, time_divison_name: "days"},
    {amount: 4.34524, time_divison_name: "weeks"},
    {amount: 12, time_divison_name: "months"},
    {amount: Number.POSITIVE_INFINITY, time_divison_name: "years"},
]

export function formatTimeAgo(date: Date) {
    const publishedDate = new Date(date)
    let duration = (publishedDate.getTime() - new Date().getTime()) / 1000

    for(let i = 0; i < DIVISIONS.length; i++) {
        const division = DIVISIONS[i]
        if(Math.abs(duration) < division.amount) {
            return formatter.format(Math.round(duration), division.time_divison_name)
        }
        duration /= division.amount
    }
}
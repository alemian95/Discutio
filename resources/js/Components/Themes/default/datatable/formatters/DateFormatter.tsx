export function DateFormatter(props : {
    date: string
    format: "day/month/year" | "month/day/year" | "year/month/date"
    className?: string
}) {

    if (! props.date) {
        return <span className={`${props.className}`}>n.d.</span>
    }

    let date = new Date(props.date)

    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()

    let formatted = "-"

    switch (props.format) {
        case "day/month/year" :
            formatted = [ day, month, year ].join("/")
            break
        case "month/day/year" :
            formatted = [ month, day, year ].join("/")
            break
        case "year/month/date" :
            formatted = [ year, month, day ].join("/")
            break
        default:
            formatted = [ year, month, day ].join("/")
            break
    }

    return (
        <span className={`${props.className}`}>{formatted}</span>
    )
}

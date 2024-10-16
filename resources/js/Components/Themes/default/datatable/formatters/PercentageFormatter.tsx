export function PercentageFormatter(props : {
    value : number
    decimals : number
    className?: string
}) {
    return (
        <span className={`${props.className}`}>{ (props.value * 100).toFixed(props.decimals) }%</span>
    )
}

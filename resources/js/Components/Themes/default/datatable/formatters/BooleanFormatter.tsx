import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import { ReactNode } from "react"

export function BooleanFormatter(props : {
    value : boolean
    trueIcon? : ReactNode
    falseIcon? : ReactNode
    onClickAction? : () => void
    onClickLabel? : string
    className?: string
}) {
    return (
        <div title={props.onClickLabel} onClick={props.onClickAction} className={`${props.onClickAction ? 'cursor-pointer' : ''} ${props.className}`}>
            {
            props.value ?
            props.trueIcon || <span className="text-green-700"><CheckCircledIcon className="scale-150" /></span> :
            props.falseIcon || <span className="text-red-700"><CrossCircledIcon className="scale-150" /></span>
            }
        </div>
    )
}

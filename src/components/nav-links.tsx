import { ComponentProps } from "react"

interface NavLinksProps extends ComponentProps<'a'> {
    children: string
}

export function NavLinks(props: NavLinksProps) {
    return (
        <a {...props} className='text-sm font-medium text-zinc-300'>{props.children}</a>
    )
}
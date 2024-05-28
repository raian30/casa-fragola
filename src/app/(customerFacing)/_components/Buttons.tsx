import Link from "next/link";

export function FilledLink ({children, href, target, className, style}: {children: React.ReactNode, href: string, target?: string, className?: string, style?:object}) {
    return (
        <Link href={href} target={target} style={style} className={'bg-white hover:bg-gray-100 transition-all px-8 py-3 border border-black font-light ' + className}>{children}</Link>
    )
}
export default function Heading({props, size = "md", children, classNames = ""}) {
    const sizes = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
        xl: "text-xl",
        xxl: "text-2xl",
        xxxl: "text-3xl",
        xxxxl: "text-4xl",
    }

    return (
        <h1 className={`${sizes[size]} ${classNames} text-black font-grotesk`} {...props}>
            {children}
        </h1>
    )
}
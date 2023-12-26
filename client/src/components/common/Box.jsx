export default function Box({ props, colour = "white", classnames = "", children }) {
    const colours = {
        purple: "bg-purple",
        white: "bg-white",
        black: "bg-black",
        off_white: "bg-off-white"
    }

    return (
        <section className={`font-grotesk border-2 m-2 border-black rounded p-4 ${colour == "white" ? "text-black" : "text-white"} ${colours[colour]} ${classnames}`} {...props}>
            {children}
        </section>
    )
}
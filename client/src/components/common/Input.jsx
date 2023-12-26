export default function Input(props) {
    const invalidCharacters = props.step ? ["e", "E", "+", "-"] : ["e", "E", "+", "-", "."];

    const blockInvalidCharacters = e => invalidCharacters.includes(e.key) && e.preventDefault();

    return (
        <div className="relative">
            <input
                {...props}
                type={props.type ? props.type : "text"}
                className={`${props.classNames} rounded border border-purple p-2 text-sm w-full disabled:bg-off-white ${props.children && "pl-5"}`}
                onKeyDown={props.type == "number" ? blockInvalidCharacters : props.onKeyDown}
            />

            {
                props.children && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                            {props.children}
                    </div>
                )
            }
        </div>
    )
}
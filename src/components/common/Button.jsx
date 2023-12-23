function Button(props) {
    const classNames = `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-purple text-white hover:bg-purple/80 h-10 px-4 py-2 disabled:bg-purple/50 `;

    return (
        <button className={classNames + props.classnames} {...props}>
                {props.children}
        </button>
    )
}

export default Button;
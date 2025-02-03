import * as React from "react"
import { cn } from "./utils"

const buttonVariants = {
    default: "bg-blue-500 text-white hover:bg-blue-500/20 hover:text-blue-500",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "bg-blue-500/20 text-blue-500 hover:bg-blue-500 hover:text-white",
}

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof buttonVariants
    loading?: boolean,
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
        className,
        disabled = false,
        loading = false,
        variant = "default",
        onClick = () => { },
        ...props }, ref) => {
        return (
            <button
                onClick={onClick}
                disabled={disabled}
                className={cn(
                    "inline-flex cursor-pointer h-13 px-4 py-2 items-center justify-center gap-2 whitespace-nowrap rounded-[12px] text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                    buttonVariants[variant],
                    className
                )}
                ref={ref}
                {...props}
            >
                {loading ? <span className="animate-spin w-5 h-5 border-2 border-white rounded-full"></span> : props.children}
            </button>
        )
    }
)

export { Button }

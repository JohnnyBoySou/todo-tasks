import  React from "react"
import { cn } from "./utils"

const Title = ({ children, className = "" }) => {
    return (
        <h1 className={cn("text-xl font-bold text-black", className)} data-testid="title">{children}</h1>
    )
}

const Label = ({ children, className = "" }) => {
    return (
        <span className={cn("text-sm font-medium text-gray-500", className)} data-testid="label">{children}</span>
    )
}

const Description = ({ children, className = "" }) => {
    return (
        <p className={cn("text-sm text-gray-500", className)} data-testid="description">{children}</p>
    )
}

export { Title, Label, Description }
import React from "react"
import { cn } from "./utils"

const Main = ({ children, className="" }) => {
    return (
        <div className={cn("w-screen h-screen flex flex-col", className) } >
            {children}
        </div>
    )
}
const Column = ({ children , className="" }) => {
    return (
        <div className={cn("flex flex-col ", className) } >
            {children}
        </div>
    )
}
const Row = ({ children , className="" }) => {
    return (
        <div className={cn("flex flex-row", className) }>
            {children}
        </div>
    )
}
const Container = ({ children, className=""}) => {
    return (
        <div className={cn("container mx-auto", className)}>
            
            {children}
        </div>
    )
}

export { Column, Row, Container, Main }
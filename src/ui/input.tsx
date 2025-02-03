import * as React from "react"
import { cn } from "./utils"
import { Eye, EyeClosed } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div>
        {label && <span className="block text-sm font-medium text-black opacity-70 mb-2">{label}</span>}
        <div className="relative">
          <input
            type={showPassword ? "text" : type}
            className={cn(
              "flex h-12 w-full rounded-md border-none text-black/90 border-b-0  bg-[#f1f1f1] px-3 py-2 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              className
            )}
            ref={ref}
            autoComplete={type === "password" ? "current-password" : undefined}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-sm font-medium text-gray-700 bg-gray-200 my-1 mx-1 rounded-md"
            >
              {showPassword ? <EyeClosed size={18}/> : <Eye size={18} />}
            </button>
          )}
        </div>
      </div>
    )
  }
)

export { Input }

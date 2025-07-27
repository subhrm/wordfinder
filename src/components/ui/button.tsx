import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg px-8 py-4 text-3xl font-bold shadow-md border border-gray-300 bg-white text-gray-900 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "",
        destructive: "bg-red-500 text-white border-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-red-300",
        outline: "bg-white text-gray-900 border-gray-400 hover:bg-gray-50",
        secondary: "bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200",
        ghost: "bg-transparent text-gray-900 border-transparent hover:bg-gray-100",
        link: "text-blue-600 border-none bg-transparent underline hover:text-blue-800 px-0 py-0 shadow-none",
      },
      size: {
        default: "px-8 py-4 text-3xl",
        sm: "px-5 py-2 text-xl",
        lg: "px-10 py-5 text-4xl",
        icon: "p-4 text-3xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

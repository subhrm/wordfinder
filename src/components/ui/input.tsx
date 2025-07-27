import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border border-gray-300 rounded px-2 py-2 text-base w-full outline-none focus:border-blue-400 bg-white",
        className
      )}
      {...props}
    />
  )
}

export { Input }

"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Link from "next/link"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // handle login here
  const handle_login: SubmitHandler<FieldValues> = async (data) => {
    console.log(data)
    // Add your login logic here (e.g., API call)
  }

  return (
    <form
      onSubmit={handleSubmit(handle_login)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">Login</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Welcome back, please enter your details to log in.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Email Field */}
        <div className="grid gap-3">
          <Label htmlFor="email">Email Address</Label>
          <Input
            {...register("email", { required: "Email is required!" })}
            id="email"
            type="email"
            placeholder="m@example.com"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forget-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            {...register("password", { required: "Password is required!" })}
            id="password"
            type="password"
            placeholder="* * * * * * * *"
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>

        {/* Divider */}
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or
          </span>
        </div>
      </div>

      {/* Sign Up Link */}
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  )
}

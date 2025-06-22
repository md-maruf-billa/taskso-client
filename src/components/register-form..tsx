"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Link from "next/link"
import { useState } from "react"
import { register_user } from "@/server_actions/auth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const router = useRouter()
    const [passError, setPassError] = useState<string>("")
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    // handle login here
    const handle_register: SubmitHandler<FieldValues> = async (data) => {
        // check confirm password is match
        if (data?.password !== data?.confirmPassword) {
            return setPassError("Confirm password not matched!")
        }
        const id = toast.loading("Information checking.....")
        const payload = {
            name: data?.name,
            email: data?.email,
            password: data?.confirmPassword
        }
        const result = await register_user(payload)
        if (result?.success) {
            toast.success(result?.message, { id })
            router.push("/")
        } else {
            toast.error(data?.message, { id })
        }
    }

    return (
        <form
            onSubmit={handleSubmit(handle_register)}
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-4xl font-bold">Sign Up</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    To Create Account, Please Fill in the From Below.
                </p>
            </div>

            <div className="grid gap-6">
                {/* Name Field */}
                <div className="grid gap-3">
                    <Label htmlFor="email">Full Name</Label>
                    <Input
                        {...register("name", { required: "Name is required!" })}
                        id="name"
                        type="text"
                        placeholder="Md Abumahid Islam"
                    />
                    {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                </div>
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
                    <Label htmlFor="password">Password</Label>
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
                {/* Confirm Password Field */}
                <div className="grid gap-3">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        {...register("confirmPassword", { required: "Confirm password is required!" })}
                        id="confirmPassword"
                        type="password"
                        placeholder="* * * * * * * *"
                    />
                    {errors.confirmPassword && (
                        <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                    )}
                    {passError.length > 2 && (
                        <p className="text-sm text-destructive">{passError}</p>
                    )}
                </div>

                <Button type="submit" className="w-full">
                    Sign Up
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
                Already have and account?{" "}
                <Link href="/" className="underline underline-offset-4">
                    Login
                </Link>
            </div>
        </form>
    )
}

"use client"
import React from 'react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { toast } from 'sonner'
import { forget_password } from '@/server_actions/auth'

export default function ForgetPasswordForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: ""
        },
    })

    // handle login here
    const handle_forget: SubmitHandler<FieldValues> = async (data) => {
        const id = toast.loading("Information checking.....")

        const result = await forget_password(data?.email as string)
        if (result?.success) {
            toast.success(result?.message, { id })
            reset()
        } else {
            toast.error(result?.message, { id })
        }
    }
    return (
        <form
            onSubmit={handleSubmit(handle_forget)}
            className={cn("flex flex-col gap-6 w-full", className)}
            {...props}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Forge Password</h1>
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
                <Button type="submit" className="w-full">
                    Get Reset Link
                </Button>

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-background text-muted-foreground relative z-10 px-2">
                        Or
                    </span>
                </div>
            </div>
            <div className="text-center text-sm">
                Have password ?{" "}
                <Link href="/" className="underline underline-offset-4">
                    Go Back
                </Link>
            </div>
        </form>
    )
}

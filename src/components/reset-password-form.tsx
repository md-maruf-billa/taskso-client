"use client"
import React from 'react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'
import { reset_password } from '@/server_actions/auth'
export default function ResetPasswordForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const searchParams = useSearchParams()
    const token = searchParams.get('token') as string
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        },
    })

    // handle login here
    const handle_forget: SubmitHandler<FieldValues> = async (data) => {
        const id = toast.loading("Information checking...")
        if (data?.newPassword !== data?.confirmPassword) {
            return toast.error("Confirm password not match", { id })
        }
        const payload = {
            token,
            newPassword: data?.confirmPassword
        }
        const res = await reset_password(payload)
        if (res?.success) {
            toast.success(res?.message, { id })
            router.push("/")
        } else {
            toast.error(res?.message, { id })
        }

    }
    return (
        <form
            onSubmit={handleSubmit(handle_forget)}
            className={cn("flex flex-col gap-6 w-full", className)}
            {...props}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Reset Password</h1>
            </div>

            <div className="grid gap-6">
                {/* Email Field */}
                <div className="grid gap-3">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                        {...register("newPassword", { required: "New Password is required!" })}
                        id="newPassword"
                        type="password"
                        placeholder="* * * * * * * * *"
                    />
                    {errors.newPassword && (
                        <p className="text-sm text-destructive">{errors.newPassword.message}</p>
                    )}
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        {...register("confirmPassword", { required: "Confirm Password is required!" })}
                        id="confirmPassword"
                        type="password"
                        placeholder="* * * * * * * * *"
                    />
                    {errors.confirmPassword && (
                        <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                    )}
                </div>
                <Button type="submit" className="w-full">
                    Save Change Password
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

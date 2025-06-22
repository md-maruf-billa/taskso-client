"use server"

import { TLoginPayload, TRegisterPayload, TResetPayload } from "@/types"
import { cookies } from "next/headers"

const url = process.env.NEXT_SERVER_URL as string

export const login_user = async (payload: TLoginPayload) => {
    console.log(url)
    const res = await fetch(url + "/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const result = await res.json()
    if (result?.success) {
        (await cookies()).set("accessToken", result?.data?.accessToken)
    }

    return result
}
export const register_user = async (payload: TRegisterPayload) => {
    console.log(url)
    const res = await fetch(url + "/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    })
    return (await res.json())
}
export const forget_password = async (email: string) => {
    console.log(url)
    const res = await fetch(url + "/auth/forget-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    return (await res.json())
}
export const reset_password = async (payload: TResetPayload) => {
    console.log(url)
    const res = await fetch(url + "/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    })
    return (await res.json())
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

const url = process.env.NEXT_SERVER_URL as string


export const get_all_task = async () => {
    const token = (await cookies()).get("accessToken")?.value as string
    const res = await fetch(url + "/task/all", {
        method: "GET",
        headers: {
            "Authorization": token
        },
        next: {
            tags: ["task"]
        }
    })

    return (await res.json())
}
export const get_single_task = async (taskId: string) => {
    const token = (await cookies()).get("accessToken")?.value as string
    const res = await fetch(url + `/task/${taskId}`, {
        method: "GET",
        headers: {
            "Authorization": token
        },
        next: {
            tags: ["task-single"]
        }
    })

    return (await res.json())
}
export const create_new_task = async (payload: Record<string, any>) => {
    const token = (await cookies()).get("accessToken")?.value as string
    const res = await fetch(url + "/task/create", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Authorization": token,
            "Content-Type": "Application/json"
        }
    })
    revalidateTag("task")
    return (await res.json())
}
export const update_task = async (payload: Record<string, any>, taskId: string) => {
    const token = (await cookies()).get("accessToken")?.value as string
    const res = await fetch(url + `/task/update/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
            "Authorization": token,
            "Content-Type": "Application/json"
        }
    })
    revalidateTag("task")
    return (await res.json())
}
export const change_task_status = async (taskId: string, status: string) => {
    const token = (await cookies()).get("accessToken")?.value as string
    const res = await fetch(url + `/task/change-status/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
        headers: {
            "Authorization": token,
            "Content-Type": "Application/json"
        }
    })
    revalidateTag("task-single")
    return (await res.json())
}
export const delete_task = async (taskId: string) => {
    const token = (await cookies()).get("accessToken")?.value as string
    const res = await fetch(url + `/task/delete/${taskId}`, {
        method: "DELETE",
        headers: {
            "Authorization": token
        }
    })
    revalidateTag("task")
    return (await res.json())
}
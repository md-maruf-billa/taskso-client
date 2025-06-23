export type TTask = {
    _id: string,
    taskName: string,
    category: string,
    description: string,
    dueDate: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    status: string
}

export type TLoginPayload = {
    email: string,
    password: string
}
export type TRegisterPayload = {
    email: string,
    password: string,
    name: string
}

export type TResetPayload = {
    token: string,
    newPassword: string
}
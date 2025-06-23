'use client'

import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from './ui/button'
import { Save } from 'lucide-react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select'
import { Calendar } from './ui/calendar'
import { categories } from '@/lib/constant'
import { toast } from 'sonner'
import { update_task } from '@/server_actions/task'
import { useRouter } from 'next/navigation'
import { TTask } from '@/types'

type TTaskFormValues = {
    taskName: string
    category: string
    description: string
    dueDate: Date | null
}

export default function EditTaskForm({ task }: { task: TTask }) {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        watch,
        reset,
        formState: { errors },
    } = useForm<TTaskFormValues>({
        defaultValues: {
            taskName: '',
            category: '',
            description: '',
            dueDate: null,
        },
    })

    // Set default values from `task` prop
    useEffect(() => {
        if (task) {
            reset({
                taskName: task.taskName || '',
                category: task.category || '',
                description: task.description || '',
                dueDate: task.dueDate ? new Date(task.dueDate) : null,
            })
        }
    }, [task, reset])

    // Manually register non-native inputs
    useEffect(() => {
        register('category', { required: 'Task category is required!' })
        register('dueDate', { required: 'Due date is required!' })
    }, [register])

    const selectedDate = watch('dueDate')

    const onSubmit: SubmitHandler<TTaskFormValues> = async (data) => {
        const id = toast.loading("Information checking.....")
        const res = await update_task(data, task?._id)
        if (res?.success) {
            toast.success(res.message, { id })
            reset()
            router.push("/dashboard")
        } else {
            toast.error(res.message, { id })
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-md p-10 max-w-5xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-xl md:text-2xl font-semibold">Update Your Task</h1>
                    <Button type="submit">
                        <Save className="w-4 h-4 mr-2" />
                        Update Task
                    </Button>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                    <div className="lg:col-span-2 space-y-3 md:space-y-6">
                        {/* Task Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="taskName">Task Name</Label>
                            <Input
                                id="taskName"
                                {...register('taskName', { required: 'Task name is required!' })}
                                placeholder="Enter your task name"
                            />
                            {errors.taskName && (
                                <p className="text-sm text-destructive">
                                    {errors.taskName.message}
                                </p>
                            )}
                        </div>

                        {/* Category */}
                        <div className="grid gap-2">
                            <Label htmlFor="category">Select Task Category</Label>
                            <Select
                                onValueChange={(value) => {
                                    setValue('category', value, { shouldValidate: true })
                                    trigger('category')
                                }}
                                defaultValue={task?.category}
                            >
                                <SelectTrigger id="category" className="w-full">
                                    <SelectValue placeholder="Select Task Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {categories.map((category, idx) => (
                                            <SelectItem key={idx} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.category && (
                                <p className="text-sm text-destructive">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="grid gap-2">
                            <Label htmlFor="description">Task Description</Label>
                            <Textarea
                                id="description"
                                {...register('description', {
                                    required: 'Task description is required!',
                                })}
                                className="h-40"
                                placeholder="Enter your description here..."
                            />
                            {errors.description && (
                                <p className="text-sm text-destructive">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right Side - Due Date */}
                    <div className="grid gap-3">
                        <Label>Select Due Date</Label>
                        <Calendar
                            mode="single"
                            selected={selectedDate ?? undefined}
                            onSelect={(date) => {
                                setValue('dueDate', date ?? null, { shouldValidate: true })
                                trigger('dueDate')
                            }}
                            className="rounded-md border shadow-sm w-full"
                            captionLayout="dropdown"
                        />
                        {errors.dueDate && (
                            <p className="text-sm text-destructive">
                                {errors.dueDate.message}
                            </p>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}

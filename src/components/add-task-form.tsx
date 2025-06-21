'use client'

import React, { useEffect } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
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

export default function AddTaskForm() {
    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            taskName: '',
            category: '',
            description: '',
            dueDate: undefined,
        },
    })

    // Manually register 'category' and 'dueDate' since they are not native inputs
    useEffect(() => {
        register('category', { required: 'Task category is required!' })
        register('dueDate', { required: 'Due date is required!' })
    }, [register])

    const selectedDate = watch('dueDate')

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log('Form Submitted:', data)
    }

    return (
        <div className="bg-white rounded-2xl shadow-md p-10 max-w-5xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Add Your New Task</h1>
                    <Button type="submit">
                        <Save className="w-4 h-4 mr-2" />
                        Save Task
                    </Button>
                </div>

                {/* Main Form */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
                    {/* Left Side (2 cols) */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Task Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="taskName">Task Name</Label>
                            <Input
                                id="taskName"
                                {...register('taskName', { required: 'Task name is required!' })}
                                placeholder="Enter Your Task Name"
                            />
                            {errors.taskName && (
                                <p className="text-sm text-destructive">
                                    {errors.taskName.message as string}
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
                            >
                                <SelectTrigger className='w-full' id="category">
                                    <SelectValue placeholder="Select Task Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            categories?.map((category, idx) => <SelectItem key={idx} value={category}>{category}</SelectItem>)
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.category && (
                                <p className="text-sm text-destructive">
                                    {errors.category.message as string}
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
                                    {errors.description.message as string}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right Side - Date Picker */}
                    <div className="grid gap-3">
                        <Label>Select Due Date</Label>
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                                setValue('dueDate', date as undefined, { shouldValidate: true })
                                trigger('dueDate')
                            }}
                            className="rounded-md border shadow-sm w-full"
                            captionLayout="dropdown"
                        />
                        {errors.dueDate && (
                            <p className="text-sm text-destructive">
                                {errors.dueDate.message as string}
                            </p>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}

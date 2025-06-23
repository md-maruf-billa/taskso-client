'use client'

import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { CalendarDays, Dot, FilePlus, ListChecks, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { categories, modifiedDate } from '@/lib/constant'
import { cn } from '@/lib/utils'
import { delete_task, get_all_task } from '@/server_actions/task'
import { TTask } from '@/types'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'

export default function DashboardHomePage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [selectedStatus, setSelectedStatus] = useState<string>('all')
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<TTask[]>([])
    const [filteredData, setFilteredData] = useState(data)
    useEffect(() => {
        const fetchData = async () => {
            const result = await get_all_task()
            setData(result?.data)
        }
        fetchData()
    }, [openModal])

    useEffect(() => {
        let tempData = data

        // Filter by category if not "all"
        if (selectedCategory !== 'all') {
            tempData = tempData.filter(task => task.category.toLocaleLowerCase() == selectedCategory.toLocaleLowerCase())
        }

        // Filter by status if not "all"
        if (selectedStatus !== 'all') {
            tempData = tempData.filter(task => task.status === selectedStatus)
        }

        setFilteredData(tempData)
    }, [selectedCategory, selectedStatus, data])

    const handleDelete = async (taskId: string) => {
        setLoading(true)
        const res = await delete_task(taskId)
        if (res?.success) {
            toast.success(res?.message)
        } else {
            toast.error(res?.message)
        }
        setOpenModal(false)
        setLoading(false)
    }

    return (
        <div className="absolute w-full container top-[90px] left-1/2 transform -translate-x-1/2 px-2 lg:px-0">
            <div>
                <h2 className='text-2xl font-semibold text-primary'>Hi Thomas</h2>
                <h1 className='text-3xl md:text-[40px] font-semibold text-white'>Welcome to Dashboard</h1>
            </div>

            <div className='bg-white rounded-2xl shadow-md p-8 mt-12'>
                {/* Filters */}
                <div className='flex flex-col lg:flex-row justify-between gap-5 lg:gap-0 items-center'>
                    <h2 className='text-2xl font-semibold'>All Task List</h2>
                    <div className="flex items-center gap-2 lg:gap-5">
                        {/* Category Filter */}
                        <Select onValueChange={setSelectedCategory} defaultValue="all">
                            <SelectTrigger className="w-[100px] md:w-[220px]">
                                <SelectValue placeholder="Select Task Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="all">All</SelectItem>
                                    {categories.map((category, idx) => (
                                        <SelectItem key={idx} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* Status Filter */}
                        <Select onValueChange={setSelectedStatus} defaultValue="all">
                            <SelectTrigger className="w-[100px] md:w-[220px]">
                                <SelectValue placeholder="Select Task Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                                    <SelectItem value="Done">Done</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* Add Task Button */}
                        <Link href="/dashboard/add-task">
                            <Button>
                                <FilePlus className="mr-2" /> Add New Task
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Task List */}
                {filteredData?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-9 mt-10 md:mt-16">
                        {filteredData.map(task => (
                            <div key={task._id} className='p-5 bg-white shadow-md rounded-xl border relative'>
                                <div className='flex items-start gap-4'>
                                    <div>
                                        <div className='bg-primary rounded-full w-12 h-12 flex justify-center items-center'>
                                            <ListChecks className="size-6" />
                                        </div>
                                    </div>
                                    <div>
                                        <Link href={`/dashboard/task-details/${task?._id}`} className='text-2xl font-semibold hover:text-primary cursor-pointer'>{task.taskName}</Link>
                                        <p className="text-sm text-[#667085] mt-2 bg-gray-200 w-fit px-4 rounded-full">
                                            {task.category}
                                        </p>
                                        <p className="text-sm text-[#667085] mt-2">{task.description?.slice(0, 200)}</p>
                                    </div>
                                </div>

                                <div className="flex justify-between mt-7">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <CalendarDays className="w-4 h-4" />
                                        <p>{modifiedDate(task.dueDate)}</p>
                                    </div>
                                    <div className={cn(
                                        "flex items-center font-medium",
                                        task.status === "Done" && "text-primary",
                                        task.status === "Ongoing" && "text-yellow-500",
                                        task.status === "Pending" && "text-pink-500"
                                    )}>
                                        <Dot className="w-6 h-6" />
                                        <p>{task.status}</p>
                                    </div>
                                </div>

                                <div className="text-red-600 absolute top-5 right-5 cursor-pointer">
                                    <Dialog onOpenChange={setOpenModal} open={openModal}>
                                        <DialogTrigger asChild>
                                            <button className='text-[#FF4C24]'><Trash2 /></button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogDescription className='flex flex-col justify-center items-center gap-4'>
                                                    <Image
                                                        src={"/delete.png"}
                                                        width={800}
                                                        height={800}
                                                        alt='delete modal'
                                                        className='max-w-sm h-full'
                                                    />
                                                    <div className="text-center">
                                                        <h1 className='text-[40px] font-semibold'>Are you Sure!!</h1>
                                                        <p>Do you want to delete this Task on this app?</p>
                                                    </div>
                                                    <div className='flex items-center gap-5'>
                                                        <Button onClick={() => handleDelete(task?._id)} className='px-10 py-5'>{loading ? "Deleting...." : "Yes"}</Button>
                                                        <Button onClick={() => setOpenModal(false)} className='px-10 py-5 bg-[#FF4C2426] hover:bg-[#ff4c2480] text-[#FF4C24]' >No</Button>
                                                    </div>
                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col justify-center items-center gap-5 p-20'>
                        <Image
                            src={"/no-task.svg"}
                            width={600}
                            height={600}
                            alt='no task image'
                        />
                        <p className='text-2xl font-semibold'>No Task is Available for this filter.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

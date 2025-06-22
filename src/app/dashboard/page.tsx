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
import { categories } from '@/lib/constant'
import { cn } from '@/lib/utils'

export default function DashboardHomePage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [selectedStatus, setSelectedStatus] = useState<string>('all')
    const [data] = useState([
        {
            _id: 1,
            taskName: "Design A Website",
            category: "Arts and Craft",
            description: "Select the role that you want to candidates for and upload your job description.",
            dueDate: "Friday, April 19 - 2024",
            status: "Pending"
        },
        {
            _id: 2,
            taskName: "Develop App",
            category: "Arts and Craft",
            description: "Build the front-end of the new application.",
            dueDate: "Monday, May 13 - 2024",
            status: "Ongoing"
        },
        {
            _id: 3,
            taskName: "Campaign Planning",
            category: "Arts and Craft",
            description: "Plan upcoming campaign for summer season.",
            dueDate: "Wednesday, June 5 - 2024",
            status: "Done"
        },
        {
            _id: 4,
            taskName: "Campaign Planning",
            category: "Arts and Craft",
            description: "Plan upcoming campaign for summer season.",
            dueDate: "Wednesday, June 5 - 2024",
            status: "Done"
        },
        {
            _id: 5,
            taskName: "Campaign Planning",
            category: "Family",
            description: "Plan upcoming campaign for summer season.",
            dueDate: "Wednesday, June 5 - 2024",
            status: "Done"
        },
        {
            _id: 6,
            taskName: "Campaign Planning",
            category: "Marketing",
            description: "Plan upcoming campaign for summer season.",
            dueDate: "Wednesday, June 5 - 2024",
            status: "Done"
        },
        {
            _id: 7,
            taskName: "Campaign Planning",
            category: "Marketing",
            description: "Plan upcoming campaign for summer season.",
            dueDate: "Wednesday, June 5 - 2024",
            status: "Done"
        },
        {
            _id: 8,
            taskName: "Campaign Planning",
            category: "Marketing",
            description: "Plan upcoming campaign for summer season.",
            dueDate: "Wednesday, June 5 - 2024",
            status: "Done"
        },
        {
            _id: 9,
            taskName: "Campaign Planning",
            category: "Marketing",
            description: "Plan upcoming campaign for summer season.",
            dueDate: "Wednesday, June 5 - 2024",
            status: "Done"
        },
    ])

    const [filteredData, setFilteredData] = useState(data)

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

    return (
        <div className="absolute w-full container top-[90px] left-1/2 transform -translate-x-1/2">
            <div>
                <h2 className='text-2xl font-semibold text-primary'>Hi Thomas</h2>
                <h1 className='text-[40px] font-semibold text-white'>Welcome to Dashboard</h1>
            </div>

            <div className='bg-white rounded-2xl shadow-md p-8 mt-12'>
                {/* Filters */}
                <div className='flex justify-between items-center'>
                    <h2 className='text-2xl font-semibold'>All Task List</h2>
                    <div className="flex items-center gap-5">
                        {/* Category Filter */}
                        <Select onValueChange={setSelectedCategory} defaultValue="all">
                            <SelectTrigger className="w-[220px]">
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
                            <SelectTrigger className="w-[220px]">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 mt-16">
                        {filteredData.map(task => (
                            <div key={task._id} className='p-5 bg-white shadow-md rounded-xl border relative'>
                                <div className='flex items-start gap-4'>
                                    <div>
                                        <div className='bg-primary rounded-full w-12 h-12 flex justify-center items-center'>
                                            <ListChecks className="size-6" />
                                        </div>
                                    </div>
                                    <div>
                                        <Link href={`/dashboard/task-details/${task?._id}`} className='text-2xl font-semibold'>{task.taskName}</Link>
                                        <p className="text-sm text-[#667085] mt-2 bg-gray-200 w-fit px-4 rounded-full">
                                            {task.category}
                                        </p>
                                        <p className="text-sm text-[#667085] mt-2">{task.description}</p>
                                    </div>
                                </div>

                                <div className="flex justify-between mt-7">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <CalendarDays className="w-4 h-4" />
                                        <p>{task.dueDate}</p>
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

                                <button className="text-red-600 absolute top-5 right-5 cursor-pointer">
                                    <Trash2 />
                                </button>
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

"use client"
import { TTask } from '@/types'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { ArrowLeftToLine, CalendarDays, Dot, ListChecks, PencilLine, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Select } from './ui/select'
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'
import Link from 'next/link'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { change_task_status, delete_task } from '@/server_actions/task'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { modifiedDate } from '@/lib/constant'

export default function TaskDetailsComponent({ task }: { task: TTask }) {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [openModal1, setOpenModal1] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleDelete = async () => {
        setLoading(true)
        const res = await delete_task(task?._id)
        if (res?.success) {
            toast.success(res?.message)
            router.push("/dashboard")
        } else {
            toast.error(res?.message)
        }
        setOpenModal(false)
        setLoading(false)
    }

    const handleStatusUpdate = async (status: string) => {
        const res = await change_task_status(task?._id, status);
        if (res?.success) {
            setOpenModal1(true)
        } else {
            toast.error(res?.message)
        }
    }

    return (
        <div className='bg-white rounded-2xl shadow-md p-10 mx-auto'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-5 md:gap-0'>
                <h1 className='text-2xl font-semibold'>Task Details</h1>
                <div className='flex items-center gap-6'>
                    <Dialog onOpenChange={setOpenModal} open={openModal}>
                        <DialogTrigger asChild>
                            <Button className='bg-[#ffe4de] hover:bg-[#f3c8be] text-[#FF4C24]'><Trash2 /> Delete Task</Button>
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
                                        <Button onClick={handleDelete} className='px-10 py-5'>{loading ? "Deleting...." : "Yes"}</Button>
                                        <Button onClick={() => setOpenModal(false)} className='px-10 py-5 bg-[#FF4C2426] hover:bg-[#ff4c2480] text-[#FF4C24]' >No</Button>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Link href={`/dashboard/task-details/edit/${task?._id}`}><Button className='bg-[#FFAB001A] text-[#FFAB00] hover:bg-amber-300 hover:text-white'><PencilLine /> Edit Task</Button></Link>
                    <Link href={"/dashboard"}> <Button ><ArrowLeftToLine /> Back</Button></Link>
                </div>
            </div>
            <hr className='my-8' />
            <div className='flex flex-col md:flex-row items-start gap-4'>
                <div>
                    <div className='bg-primary rounded-full size-8 md:size-16 flex justify-center items-center'>
                        <ListChecks className="size-5 md:size-10" />
                    </div>
                </div>

                <div>
                    <div>
                        <h1 className='text-xl md:text-3xl font-semibold'>{task?.taskName}</h1>
                        <p className='text-[#667085] text-sm md:text-base mt-2 font-light'>{task?.description}</p>
                    </div>

                    <div className='mt-16 flex items-center gap-4 lg:gap-9'>
                        <div>
                            <p className='text-sm'>End Date</p>
                            <div className='flex items-center gap-2 text-gray-700'>
                                <CalendarDays className="w-4 h-4" />
                                <p>{modifiedDate(task?.dueDate)}</p>
                            </div>
                        </div>
                        <div className='h-20 border'></div>
                        <div className={cn(
                            "flex items-center font-semibold text-xl md:text-3xl",
                            task?.status === "Done" && "text-primary",
                            task?.status === "Ongoing" && "text-yellow-500",
                            task?.status === "Pending" && "text-pink-500"
                        )}>
                            <Dot className="size-16" />
                            <p>{task.status}</p>
                        </div>
                    </div>
                    <div className='grid gap-2 mt-16'>
                        <Label className='text-sm'>Change Status</Label>
                        <Select onValueChange={(value) => handleStatusUpdate(value)} defaultValue={task?.status}>
                            <SelectTrigger className="w-[220px]">
                                <SelectValue placeholder="Select Task Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                                    <SelectItem value="Done">Done</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>


                    <Dialog onOpenChange={setOpenModal1} open={openModal1}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogDescription className='flex flex-col justify-center items-center gap-4'>
                                    <Image
                                        src={"/modal.png"}
                                        width={800}
                                        height={800}
                                        alt='delete modal'
                                        className='max-w-sm h-full'
                                    />
                                    <div className="text-center">
                                        <h1 className='text-xl font-semibold'>Successfully status change the Task!</h1>
                                    </div>
                                    <div className='flex items-center gap-5'>
                                        <Button onClick={() => setOpenModal1(false)} className='px-10 py-5 bg-[#FF4C2426] hover:bg-[#ff4c2480] text-[#FF4C24]' >Close</Button>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

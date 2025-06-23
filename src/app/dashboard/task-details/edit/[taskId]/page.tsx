import EditTaskForm from '@/components/edit-task-form'
import { get_single_task } from '@/server_actions/task'
import React from 'react'

export default async function Edit_Task_Page({ params }: { params: { taskId: string } }) {
    const res = await get_single_task(params?.taskId)
    return (
        <div className="fixed w-full container top-[90px] left-1/2 transform -translate-x-1/2  p-4 ">
            <EditTaskForm task={res?.data} />
        </div>
    )
}

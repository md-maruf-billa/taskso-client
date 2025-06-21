import AddTaskForm from '@/components/add-task-form'
import React from 'react'

export default function Add_Task_Page() {
    return (
        <div className="fixed w-full container top-[90px] left-1/2 transform -translate-x-1/2  p-4 ">
            <AddTaskForm />
        </div>
    )
}

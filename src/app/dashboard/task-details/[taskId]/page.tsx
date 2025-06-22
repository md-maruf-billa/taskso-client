import TaskDetailsComponent from '@/components/task-details-component'


export default async function TaskDetailsPage({ params }: { params: { taskId: string } }) {
    console.log(await params)
    const task = {
        _id: 7,
        taskName: "Campaign Planning",
        category: "Marketing",
        description: "Select the role that you want to candidates for and upload your job description. Select the role that you want to candidates for and upload your job description. Select the role that you want to candidates for and upload your job description. Select the role that you want to candidates for and upload your job description.",
        dueDate: "Wednesday, June 5 - 2024",
        status: "Done",
        email: "hello@gmail.com",
        createdAt: "10 jun 20",
        updatedAt: ""
    }
    return (
        <div className='fixed w-full container top-[120px] left-1/2 transform -translate-x-1/2  '>
            <TaskDetailsComponent task={task} />
        </div>
    )
}

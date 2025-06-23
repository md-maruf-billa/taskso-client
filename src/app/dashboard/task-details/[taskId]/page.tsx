import TaskDetailsComponent from '@/components/task-details-component'
import { get_single_task } from '@/server_actions/task'


export default async function TaskDetailsPage({ params }: { params: { taskId: string } }) {

    const res = await get_single_task(params?.taskId)
    return (
        <div className='fixed w-full container top-[120px] left-1/2 transform -translate-x-1/2  '>
            <TaskDetailsComponent task={res?.data} />
        </div>
    )
}

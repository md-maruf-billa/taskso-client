import TaskDetailsComponent from '@/components/task-details-component'
import { get_single_task } from '@/server_actions/task'

// ✅ Declare a clear PageProps type
export interface PageProps {
    params: {
        taskId: string;
    };
}

// ✅ Explicit async function with props
export default async function TaskDetailsPage({ params }: { params: Promise<{ taskId: string }> }) {
    const { taskId } = await params;
    const res = await get_single_task(taskId);

    return (
        <div className="absolute w-full container top-[120px] left-1/2 transform -translate-x-1/2">
            <TaskDetailsComponent task={res?.data} />
        </div>
    );
}

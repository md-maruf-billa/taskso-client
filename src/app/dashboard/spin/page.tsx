import SpinWheel from "@/components/spin-wheel"
import { get_all_task } from "@/server_actions/task"

const SpinPage = async () => {
    const data = await get_all_task()
    return (
        <div className='fixed w-full container top-[120px] left-1/2 transform -translate-x-1/2  '>
            <SpinWheel tasks={data?.data} />
        </div>
    )
}

export default SpinPage
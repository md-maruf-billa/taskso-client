'use client'

import { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { categories } from '@/lib/constant';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { LoaderPinwheel } from 'lucide-react';
import { TTask } from '@/types';
import { useRouter } from 'next/navigation';

export default function SpinWheel({ tasks }: { tasks: TTask[] }) {
    const router = useRouter();
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [filteredData, setFilteredData] = useState<TTask[]>(tasks);

    useEffect(() => {
        let tempData = tasks;
        if (selectedCategory !== 'all') {
            tempData = tempData.filter(task => task.category.toLowerCase() === selectedCategory.toLowerCase());
        }
        setFilteredData(tempData);
    }, [selectedCategory, tasks]);

    const handleSpinClick = () => {
        if (filteredData.length === 0) return;
        const newPrizeNumber = Math.floor(Math.random() * filteredData.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };

    const handleGoToTask = () => {
        const selectedTask = filteredData[prizeNumber];
        if (selectedTask?._id) {
            router.push(`/dashboard/task-details/${selectedTask._id}`);
        }
    };

    return (
        <div className='bg-white rounded-2xl shadow-md p-10 mx-auto'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-semibold'>Spin Wheel</h1>
                <div className='space-y-2'>
                    <Label>Select Task Category</Label>
                    <Select onValueChange={setSelectedCategory} defaultValue="all">
                        <SelectTrigger className="w-[180px]">
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
                </div>
            </div>

            <div className='flex flex-col justify-center items-center gap-8 mt-6'>
                <div style={{ position: 'relative', display: 'inline-block', rotate: '130deg' }}>
                    <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={filteredData.map(task => ({ option: task.taskName }))}
                        fontSize={12}
                        outerBorderWidth={15}
                        outerBorderColor='#CE3816'
                        innerBorderWidth={30}
                        innerBorderColor='white'
                        radiusLineWidth={0}
                        backgroundColors={['#2ca02c', '#98df8a', '#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78']}
                        textColors={['#1F1F1F']}
                        onStopSpinning={() => setMustSpin(false)}
                    />
                </div>

                <p className='mt-12'>Spin Wheel to pick your task</p>

                <div className='space-x-2'>
                    <Button onClick={handleSpinClick} className='w-36 py-6'>
                        Spin <LoaderPinwheel />
                    </Button>
                    <Button
                        onClick={handleGoToTask}
                        className='w-36 py-6'
                        disabled={filteredData.length === 0}
                    >
                        Go to Task
                    </Button>
                </div>
            </div>
        </div>
    );
}

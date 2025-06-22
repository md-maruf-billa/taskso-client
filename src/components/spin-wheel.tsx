"use client"
import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { categories } from '@/lib/constant';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { LoaderPinwheel } from 'lucide-react';

const data = [
    { option: 'Sport' },
    { option: 'Family' },
    { option: 'Nature' },
    { option: 'Arts and Craft' },
    { option: 'Meditation' },
    { option: 'Friends' },
];

export default function SpinWheel() {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string>("all")

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };
    console.log(prizeNumber)

    return (
        <div className='bg-white rounded-2xl shadow-md p-10 mx-auto'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-semibold'>Spin Wheel</h1>

                <div className='space-y-2'>
                    <Label>Select Task Category</Label>
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
                </div>
            </div>

            <div className='flex flex-col justify-center items-center gap-8'>
                <div style={{ position: 'relative', display: 'inline-block', rotate: '130deg' }}>
                    <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={data}
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
                <div className='space-x-4 '>
                    <Button onClick={handleSpinClick} className='w-40 py-6'>Spin <LoaderPinwheel /></Button>
                    <Button onClick={handleSpinClick} className='w-40 py-6'>Go to Task </Button>
                </div>
            </div>

        </div>
    );
}

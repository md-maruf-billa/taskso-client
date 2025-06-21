import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Error_Page() {
    return (
        <div className='flex justify-center items-center min-h-screen container mx-auto'>
            <div className='flex flex-col justify-center items-center gap-16'>
                <Image
                    src={"/error-logo.svg"}
                    width={500}
                    height={500}
                    alt='Error Image'
                />
                <Link href="/">
                    <Button className='w-52'>Back To Home</Button>
                </Link>
            </div>
        </div>
    )
}

import ResetPasswordForm from '@/components/reset-password-form'
import Image from 'next/image'
import React from 'react'

export default function ResetPassword() {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='max-w-md w-full border rounded-md p-5 bg-white shadow-md'>
                <div className='flex justify-center items-center'>
                    <Image
                        src="/logo.png"
                        width={500}
                        height={500}
                        alt='tasko logo'
                        className='size-10'
                    />
                </div>

                <div className='mt-5'>
                    <ResetPasswordForm />
                </div>
            </div>
        </div>
    )
}

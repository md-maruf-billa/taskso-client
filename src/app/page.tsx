import { LoginForm } from "@/components/login-form"
import Image from "next/image"

export default function Home_Page() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className=" relative hidden lg:block ">
        <Image
          width={1000}
          height={1000}
          src="/login-bg.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

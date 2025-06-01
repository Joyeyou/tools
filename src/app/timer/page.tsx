'use client'

import { TimerApp } from '@/components/Timer'
import { useEffect, useState } from 'react'

/**
 * @description 计时器页面
 */
export default function TimerPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 确保loading至少显示200毫秒
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8 pb-20 md:pb-8">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          计时器工具
        </h1>
        <TimerApp />
      </div>
    </main>
  )
} 
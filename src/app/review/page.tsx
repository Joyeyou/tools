'use client'

import { ReviewGeneratorApp } from '@/components/ReviewGenerator'
import { useEffect, useState } from 'react'

/**
 * @description 评论生成器页面
 */
export default function ReviewPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 确保loading至少显示200毫秒
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 px-4 py-6 pb-20 md:pb-8">
      <section className="container mx-auto max-w-3xl space-y-6">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-900">评论生成器</h1>
          <p className="text-gray-500 mt-1">快速生成餐厅和酒店的评论</p>
        </div>
        
        <ReviewGeneratorApp />
      </section>
    </main>
  )
} 
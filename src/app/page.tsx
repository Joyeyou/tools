'use client'

import { NavigationCard } from '@/components/ui/navigation-card'
import { ClipboardList, Timer, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

/**
 * @description 首页 - iOS风格简洁设计
 */
export default function HomePage() {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		// 确保loading至少显示200毫秒
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 200)

		return () => clearTimeout(timer)
	}, [])

	const tools = [
		{
			title: '待办事项',
			description: '创建和管理您的待办事项列表',
			href: '/todo',
			icon: ClipboardList,
			color: 'bg-blue-50 text-blue-500'
		},
		{
			title: '计时器',
			description: '简单易用的计时工具',
			href: '/timer',
			icon: Timer,
			color: 'bg-purple-50 text-purple-500'
		},
		{
			title: '番茄时钟',
			description: '高效的专注与休息循环管理',
			href: '/pomodoro',
			icon: Clock,
			color: 'bg-red-50 text-red-500'
		},
		// 未来可以在此添加更多工具
	]

	return (
		<main className="min-h-screen flex flex-col bg-gray-50 px-4 py-6 pb-20 md:pb-8">
			<section className="container mx-auto max-w-3xl">
				<div className="mb-10 px-2">
					<h1 className="text-2xl font-semibold text-gray-900">实用工具集</h1>
					<p className="text-gray-500 mt-1">选择下面的工具开始使用</p>
				</div>
				
				<div className="space-y-4">
					{tools.map((tool) => (
						<NavigationCard
							key={tool.href}
							title={tool.title}
							description={tool.description}
							href={tool.href}
							icon={tool.icon}
							color={tool.color}
						/>
					))}
				</div>
			</section>
		</main>
	)
}

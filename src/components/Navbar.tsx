'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ClipboardList, Timer, Clock, MessageSquare, Train } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * @description 导航栏项 - iOS风格
 */
const NavItem = ({
  href,
  icon: Icon,
  label,
  isActive,
}: {
  href: string
  icon: React.ElementType
  label: string
  isActive: boolean
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center justify-center py-2 px-3',
        'transition-all'
      )}
    >
      <Icon 
        className={cn(
          'h-6 w-6 mb-1',
          isActive ? 'text-blue-500' : 'text-gray-400'
        )} 
      />
      <span 
        className={cn(
          'text-xs',
          isActive ? 'text-blue-500 font-medium' : 'text-gray-500'
        )}
      >
        {label}
      </span>
    </Link>
  )
}

/**
 * @description 导航栏组件 - iOS风格
 */
export function Navbar() {
  const pathname = usePathname()

  const routes = [
    { href: '/', icon: Home, label: '首页' },
    { href: '/todo', icon: ClipboardList, label: '待办事项' },
    { href: '/timer', icon: Timer, label: '计时器' },
    { href: '/pomodoro', icon: Clock, label: '番茄钟' },
    { href: '/review', icon: MessageSquare, label: '评论' },
    { href: '/train', icon: Train, label: '火车票' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 z-10 flex justify-around py-2 md:hidden">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          href={route.href}
          icon={route.icon}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  )
} 
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'

/**
 * @description 导航卡片组件，用于首页显示可用工具，采用iOS风格设计
 */
interface NavigationCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
  color?: string
}

export function NavigationCard({ 
  title, 
  description, 
  href, 
  icon: Icon,
  color = "bg-blue-50 text-blue-500" 
}: NavigationCardProps) {
  return (
    <Link href={href} className="block group">
      <div className="relative overflow-hidden rounded-2xl transition-all bg-white shadow-sm hover:shadow-md border border-gray-100 p-5">
        <div className="flex items-start gap-4">
          <div className={cn(
            "flex items-center justify-center w-12 h-12 rounded-full",
            color
          )}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              {title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {description}
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </Link>
  )
} 
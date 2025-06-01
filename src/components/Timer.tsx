'use client'

import { useTimerStore } from '@/store/timer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Play, Pause, RotateCcw, Save, Trash2 } from 'lucide-react'

/**
 * @description 将秒数转换为时分秒格式
 */
const formatTime = (timeInSeconds: number): string => {
  const hours = Math.floor(timeInSeconds / 3600)
  const minutes = Math.floor((timeInSeconds % 3600) / 60)
  const seconds = timeInSeconds % 60

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':')
}

/**
 * @description 已保存的计时器项
 */
const TimerItem = ({ timer, onDelete }: { 
  timer: { id: string; name: string; duration: number; createdAt: number }
  onDelete: (id: string) => void
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex flex-col">
        <span className="text-sm font-medium">{timer.name}</span>
        <span className="text-xs text-gray-500">{formatTime(timer.duration)}</span>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onDelete(timer.id)}
        className="h-8 w-8"
      >
        <Trash2 className="h-4 w-4 text-gray-500" />
      </Button>
    </div>
  )
}

/**
 * @description 计时器组件
 */
export const TimerApp = () => {
  const { 
    isRunning, 
    timeInSeconds, 
    startTimer, 
    pauseTimer, 
    resetTimer, 
    tick,
    saveTimer,
    timers,
    deleteTimer
  } = useTimerStore()
  
  const [timerName, setTimerName] = useState('')

  // 定时器更新
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isRunning) {
      interval = setInterval(() => {
        tick()
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, tick])

  const handleSaveTimer = () => {
    if (timeInSeconds === 0) {
      toast.error('计时器时间为0，无法保存')
      return
    }
    
    saveTimer(timerName)
    setTimerName('')
    toast.success('计时器已保存')
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-center">计时器</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-4">
          <div className="text-5xl font-bold tracking-wider">
            {formatTime(timeInSeconds)}
          </div>
          
          <div className="flex gap-2">
            {!isRunning ? (
              <Button 
                onClick={startTimer}
                variant="default" 
                className="flex items-center gap-1"
              >
                <Play className="h-4 w-4" />
                开始
              </Button>
            ) : (
              <Button 
                onClick={pauseTimer}
                variant="secondary" 
                className="flex items-center gap-1"
              >
                <Pause className="h-4 w-4" />
                暂停
              </Button>
            )}
            
            <Button 
              onClick={resetTimer}
              variant="outline" 
              className="flex items-center gap-1"
            >
              <RotateCcw className="h-4 w-4" />
              重置
            </Button>
          </div>
        </div>
        
        <div className="pt-2">
          <div className="flex space-x-2">
            <Input
              value={timerName}
              onChange={(e) => setTimerName(e.target.value)}
              placeholder="计时器名称（可选）"
              className="flex-1"
            />
            <Button 
              onClick={handleSaveTimer} 
              variant="secondary"
              disabled={timeInSeconds === 0}
            >
              <Save className="h-4 w-4 mr-1" />
              保存
            </Button>
          </div>
        </div>
        
        {timers.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="font-medium mb-2">已保存的计时器</h3>
              <div className="space-y-1 max-h-[200px] overflow-y-auto pr-2">
                {timers.map((timer) => (
                  <TimerItem 
                    key={timer.id} 
                    timer={timer}
                    onDelete={deleteTimer}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
} 
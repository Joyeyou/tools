'use client'

import { usePomodoroStore, type PomodoroMode } from '@/store/pomodoro'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  Settings as SettingsIcon, 
  X
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

/**
 * @description 将秒数格式化为分:秒
 */
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

/**
 * @description 获取模式的中文名称
 */
const getModeLabel = (mode: PomodoroMode): string => {
  switch (mode) {
    case 'work':
      return '工作'
    case 'shortBreak':
      return '短休息'
    case 'longBreak':
      return '长休息'
  }
}

/**
 * @description 获取模式对应的颜色类
 */
const getModeColor = (mode: PomodoroMode): string => {
  switch (mode) {
    case 'work':
      return 'text-red-500'
    case 'shortBreak':
      return 'text-green-500'
    case 'longBreak':
      return 'text-blue-500'
  }
}

/**
 * @description 设置对话框组件
 */
const SettingsDialog = () => {
  const { settings, updateSettings } = usePomodoroStore()
  const [workDuration, setWorkDuration] = useState(settings.workDuration.toString())
  const [shortBreakDuration, setShortBreakDuration] = useState(settings.shortBreakDuration.toString())
  const [longBreakDuration, setLongBreakDuration] = useState(settings.longBreakDuration.toString())
  const [longBreakInterval, setLongBreakInterval] = useState(settings.longBreakInterval.toString())
  const [open, setOpen] = useState(false)

  const handleSave = () => {
    const newSettings = {
      workDuration: parseInt(workDuration) || 25,
      shortBreakDuration: parseInt(shortBreakDuration) || 5,
      longBreakDuration: parseInt(longBreakDuration) || 15,
      longBreakInterval: parseInt(longBreakInterval) || 4,
    }
    
    updateSettings(newSettings)
    toast.success('设置已保存')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <SettingsIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>番茄钟设置</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="workDuration">工作时长（分钟）</Label>
              <Input
                id="workDuration"
                type="number"
                min="1"
                max="60"
                value={workDuration}
                onChange={(e) => setWorkDuration(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortBreakDuration">短休息时长（分钟）</Label>
              <Input
                id="shortBreakDuration"
                type="number"
                min="1"
                max="30"
                value={shortBreakDuration}
                onChange={(e) => setShortBreakDuration(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longBreakDuration">长休息时长（分钟）</Label>
              <Input
                id="longBreakDuration"
                type="number"
                min="1"
                max="60"
                value={longBreakDuration}
                onChange={(e) => setLongBreakDuration(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longBreakInterval">长休息间隔（次数）</Label>
              <Input
                id="longBreakInterval"
                type="number"
                min="1"
                max="10"
                value={longBreakInterval}
                onChange={(e) => setLongBreakInterval(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>保存设置</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/**
 * @description 统计信息组件
 */
const StatsSection = () => {
  const { completedPomodoros, sessions } = usePomodoroStore()
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  
  const todaySession = sessions.find(s => s.date === todayStart.getTime())
  const todayCompleted = todaySession?.completedPomodoros || 0
  const todayWorkTimeMinutes = todaySession ? Math.floor(todaySession.totalWorkTime / 60) : 0
  
  return (
    <div className="mt-4">
      <h3 className="font-medium mb-2">今日统计</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-100 p-3 rounded-md">
          <p className="text-sm text-gray-500">完成番茄钟</p>
          <p className="text-xl font-semibold">{todayCompleted}</p>
        </div>
        <div className="bg-slate-100 p-3 rounded-md">
          <p className="text-sm text-gray-500">专注时间</p>
          <p className="text-xl font-semibold">{todayWorkTimeMinutes} 分钟</p>
        </div>
      </div>
    </div>
  )
}

/**
 * @description 番茄钟组件
 */
export const PomodoroApp = () => {
  const { 
    isRunning, 
    timeLeft, 
    currentMode,
    completedPomodoros,
    startTimer, 
    pauseTimer, 
    resetTimer,
    skipToNext,
    tick
  } = usePomodoroStore()

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

  // 时间结束时通知用户
  useEffect(() => {
    if (timeLeft === 0 && !isRunning) {
      const mode = currentMode === 'work' ? '工作' : currentMode === 'shortBreak' ? '短休息' : '长休息'
      toast.success(`${mode}时间已结束！`)
    }
  }, [timeLeft, isRunning, currentMode])

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-medium">番茄钟</CardTitle>
        <div className="flex items-center gap-2">
          <div className="text-sm bg-slate-100 px-2 py-1 rounded">
            完成：{completedPomodoros}
          </div>
          <SettingsDialog />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Tabs defaultValue={currentMode} className="w-full">
              <TabsList className="w-full">
                <TabsTrigger 
                  value="work"
                  className={currentMode === 'work' ? 'text-red-500' : ''}
                  disabled
                >
                  工作
                </TabsTrigger>
                <TabsTrigger 
                  value="shortBreak"
                  className={currentMode === 'shortBreak' ? 'text-green-500' : ''}
                  disabled
                >
                  短休息
                </TabsTrigger>
                <TabsTrigger 
                  value="longBreak"
                  className={currentMode === 'longBreak' ? 'text-blue-500' : ''}
                  disabled
                >
                  长休息
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`text-6xl font-bold tracking-wider ${getModeColor(currentMode)}`}>
              {formatTime(timeLeft)}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {getModeLabel(currentMode)}时间
            </p>
          </div>
          
          <div className="flex justify-center gap-2">
            {!isRunning ? (
              <Button 
                onClick={startTimer}
                variant="default" 
                className="flex items-center gap-1"
                disabled={timeLeft === 0}
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
            
            <Button 
              onClick={skipToNext}
              variant="outline" 
              className="flex items-center gap-1"
            >
              <SkipForward className="h-4 w-4" />
              下一个
            </Button>
          </div>
        </div>
        
        <Separator />
        
        <StatsSection />
      </CardContent>
    </Card>
  )
} 
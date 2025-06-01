/**
 * @description 番茄钟存储
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type PomodoroMode = 'work' | 'shortBreak' | 'longBreak'

interface PomodoroSettings {
  workDuration: number // 工作时长（分钟）
  shortBreakDuration: number // 短休息时长（分钟）
  longBreakDuration: number // 长休息时长（分钟）
  longBreakInterval: number // 长休息间隔（次数）
}

interface PomodoroSession {
  id: string
  date: number
  completedPomodoros: number
  totalWorkTime: number // 总工作时间（秒）
}

interface PomodoroState {
  isRunning: boolean
  currentMode: PomodoroMode
  timeLeft: number // 剩余时间（秒）
  completedPomodoros: number // 完成的番茄钟数量
  settings: PomodoroSettings
  sessions: PomodoroSession[]
  
  // 操作函数
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  skipToNext: () => void
  tick: () => void
  updateSettings: (settings: Partial<PomodoroSettings>) => void
  clearSessions: () => void
}

// 获取今天的日期（0点0分0秒）
const getTodayStart = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today.getTime()
}

// 默认设置
const DEFAULT_SETTINGS: PomodoroSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
}

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set, get) => ({
      isRunning: false,
      currentMode: 'work',
      timeLeft: DEFAULT_SETTINGS.workDuration * 60,
      completedPomodoros: 0,
      settings: DEFAULT_SETTINGS,
      sessions: [],
      
      startTimer: () => set({ isRunning: true }),
      
      pauseTimer: () => set({ isRunning: false }),
      
      resetTimer: () => {
        const { currentMode, settings } = get()
        let timeLeft = 0
        
        switch (currentMode) {
          case 'work':
            timeLeft = settings.workDuration * 60
            break
          case 'shortBreak':
            timeLeft = settings.shortBreakDuration * 60
            break
          case 'longBreak':
            timeLeft = settings.longBreakDuration * 60
            break
        }
        
        set({ isRunning: false, timeLeft })
      },
      
      skipToNext: () => {
        const { currentMode, completedPomodoros, settings } = get()
        let newMode: PomodoroMode = 'work'
        let newTimeLeft = 0
        let newCompletedPomodoros = completedPomodoros
        
        // 根据当前模式决定下一个模式
        if (currentMode === 'work') {
          newCompletedPomodoros = completedPomodoros + 1
          
          // 记录今日完成的番茄钟
          const todayStart = getTodayStart()
          const sessions = [...get().sessions]
          const todaySession = sessions.find(s => s.date === todayStart)
          
          if (todaySession) {
            todaySession.completedPomodoros += 1
            todaySession.totalWorkTime += settings.workDuration * 60
          } else {
            sessions.push({
              id: crypto.randomUUID(),
              date: todayStart,
              completedPomodoros: 1,
              totalWorkTime: settings.workDuration * 60
            })
          }
          
          // 决定是短休息还是长休息
          if (newCompletedPomodoros % settings.longBreakInterval === 0) {
            newMode = 'longBreak'
            newTimeLeft = settings.longBreakDuration * 60
          } else {
            newMode = 'shortBreak'
            newTimeLeft = settings.shortBreakDuration * 60
          }
          
          set({ sessions })
        } else {
          // 如果当前是休息，则下一个是工作
          newMode = 'work'
          newTimeLeft = settings.workDuration * 60
        }
        
        set({ 
          currentMode: newMode, 
          timeLeft: newTimeLeft, 
          completedPomodoros: newCompletedPomodoros,
          isRunning: false
        })
      },
      
      tick: () => {
        const { timeLeft, isRunning } = get()
        if (!isRunning || timeLeft <= 0) return
        
        if (timeLeft === 1) {
          // 当计时结束时
          set({ timeLeft: 0, isRunning: false })
          // 可以在这里添加提示音或通知
        } else {
          set({ timeLeft: timeLeft - 1 })
        }
      },
      
      updateSettings: (newSettings) => {
        const currentSettings = get().settings
        const mergedSettings = { ...currentSettings, ...newSettings }
        set({ 
          settings: mergedSettings,
          timeLeft: get().currentMode === 'work' 
            ? mergedSettings.workDuration * 60 
            : get().currentMode === 'shortBreak'
              ? mergedSettings.shortBreakDuration * 60
              : mergedSettings.longBreakDuration * 60
        })
      },
      
      clearSessions: () => set({ sessions: [] }),
    }),
    {
      name: 'pomodoro-storage',
    }
  )
) 
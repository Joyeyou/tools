/**
 * @description 计时器存储
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TimerState {
  isRunning: boolean
  timeInSeconds: number
  startTime: number | null
  timers: {
    id: string
    name: string
    duration: number
    createdAt: number
  }[]
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  tick: () => void
  saveTimer: (name: string) => void
  deleteTimer: (id: string) => void
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      isRunning: false,
      timeInSeconds: 0,
      startTime: null,
      timers: [],
      startTimer: () => set({ isRunning: true, startTime: Date.now() }),
      pauseTimer: () => set({ isRunning: false }),
      resetTimer: () => set({ isRunning: false, timeInSeconds: 0, startTime: null }),
      tick: () => {
        if (get().isRunning) {
          set({ timeInSeconds: get().timeInSeconds + 1 })
        }
      },
      saveTimer: (name) => {
        const currentTime = get().timeInSeconds
        if (currentTime > 0) {
          set((state) => ({
            timers: [
              ...state.timers,
              {
                id: crypto.randomUUID(),
                name: name || `计时器 ${state.timers.length + 1}`,
                duration: currentTime,
                createdAt: Date.now(),
              },
            ],
          }))
        }
      },
      deleteTimer: (id) =>
        set((state) => ({
          timers: state.timers.filter((timer) => timer.id !== id),
        })),
    }),
    {
      name: 'timer-storage',
    }
  )
) 
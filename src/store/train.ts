/**
 * @description 火车票查询系统存储
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 火车站点信息
export interface Station {
  code: string
  name: string
}

// 火车信息
export interface Train {
  id: string
  trainNumber: string
  departStation: Station
  arriveStation: Station
  departTime: string
  arriveTime: string
  duration: string
  price: {
    business?: number // 商务座
    firstClass?: number // 一等座
    secondClass?: number // 二等座
    softSleeper?: number // 软卧
    hardSleeper?: number // 硬卧
    hardSeat?: number // 硬座
    noSeat?: number // 无座
  }
  distance: number // 公里数
}

// 搜索历史记录
export interface SearchHistory {
  id: string
  from: Station
  to: Station
  date: string
  timestamp: number
}

interface TrainState {
  stations: Station[]
  trains: Train[]
  searchHistory: SearchHistory[]
  addSearchHistory: (from: Station, to: Station, date: string) => void
  clearSearchHistory: () => void
  deleteSearchHistory: (id: string) => void
}

// 模拟的火车站数据
const mockStations: Station[] = [
  { code: 'BJP', name: '北京' },
  { code: 'SHH', name: '上海' },
  { code: 'GZQ', name: '广州' },
  { code: 'SZQ', name: '深圳' },
  { code: 'CDW', name: '成都' },
  { code: 'HBB', name: '哈尔滨' },
  { code: 'NJH', name: '南京' },
  { code: 'HZH', name: '杭州' },
  { code: 'WMR', name: '乌鲁木齐' },
  { code: 'CQW', name: '重庆' },
  { code: 'TJP', name: '天津' },
  { code: 'XAN', name: '西安' },
  { code: 'CCT', name: '长春' },
  { code: 'CSQ', name: '长沙' },
  { code: 'ZZF', name: '郑州' },
  { code: 'JNK', name: '济南' },
  { code: 'NFF', name: '南宁' },
  { code: 'LJY', name: '丽江' },
]

// 模拟的火车数据
const mockTrains: Train[] = [
  {
    id: '1',
    trainNumber: 'G1234',
    departStation: { code: 'BJP', name: '北京' },
    arriveStation: { code: 'SHH', name: '上海' },
    departTime: '08:00',
    arriveTime: '13:30',
    duration: '5小时30分',
    price: {
      business: 1800,
      firstClass: 980,
      secondClass: 550,
    },
    distance: 1318
  },
  {
    id: '2',
    trainNumber: 'G5678',
    departStation: { code: 'BJP', name: '北京' },
    arriveStation: { code: 'SHH', name: '上海' },
    departTime: '09:15',
    arriveTime: '14:45',
    duration: '5小时30分',
    price: {
      business: 1800,
      firstClass: 960,
      secondClass: 530,
    },
    distance: 1318
  },
  {
    id: '3',
    trainNumber: 'G7890',
    departStation: { code: 'BJP', name: '北京' },
    arriveStation: { code: 'SHH', name: '上海' },
    departTime: '10:30',
    arriveTime: '16:00',
    duration: '5小时30分',
    price: {
      business: 1800,
      firstClass: 980,
      secondClass: 550,
    },
    distance: 1318
  },
  {
    id: '4',
    trainNumber: 'Z1234',
    departStation: { code: 'BJP', name: '北京' },
    arriveStation: { code: 'SHH', name: '上海' },
    departTime: '19:30',
    arriveTime: '07:45',
    duration: '12小时15分',
    price: {
      softSleeper: 650,
      hardSleeper: 350,
      hardSeat: 180,
    },
    distance: 1318
  },
  {
    id: '5',
    trainNumber: 'K5678',
    departStation: { code: 'BJP', name: '北京' },
    arriveStation: { code: 'SHH', name: '上海' },
    departTime: '21:00',
    arriveTime: '09:45',
    duration: '12小时45分',
    price: {
      softSleeper: 620,
      hardSleeper: 320,
      hardSeat: 160,
      noSeat: 120,
    },
    distance: 1318
  },
  {
    id: '6',
    trainNumber: 'G2345',
    departStation: { code: 'BJP', name: '北京' },
    arriveStation: { code: 'GZQ', name: '广州' },
    departTime: '08:30',
    arriveTime: '16:45',
    duration: '8小时15分',
    price: {
      business: 2300,
      firstClass: 1450,
      secondClass: 820,
    },
    distance: 2294
  },
  {
    id: '7',
    trainNumber: 'G8765',
    departStation: { code: 'SHH', name: '上海' },
    arriveStation: { code: 'BJP', name: '北京' },
    departTime: '07:00',
    arriveTime: '12:30',
    duration: '5小时30分',
    price: {
      business: 1800,
      firstClass: 980,
      secondClass: 550,
    },
    distance: 1318
  },
  {
    id: '8',
    trainNumber: 'G5432',
    departStation: { code: 'SHH', name: '上海' },
    arriveStation: { code: 'GZQ', name: '广州' },
    departTime: '08:45',
    arriveTime: '15:20',
    duration: '6小时35分',
    price: {
      business: 2050,
      firstClass: 1300,
      secondClass: 750,
    },
    distance: 1780
  },
  {
    id: '9',
    trainNumber: 'D3456',
    departStation: { code: 'GZQ', name: '广州' },
    arriveStation: { code: 'SZQ', name: '深圳' },
    departTime: '09:30',
    arriveTime: '10:15',
    duration: '45分钟',
    price: {
      firstClass: 120,
      secondClass: 75,
    },
    distance: 140
  },
  {
    id: '10',
    trainNumber: 'D1234',
    departStation: { code: 'CDW', name: '成都' },
    arriveStation: { code: 'CQW', name: '重庆' },
    departTime: '10:20',
    arriveTime: '12:15',
    duration: '1小时55分',
    price: {
      firstClass: 180,
      secondClass: 110,
    },
    distance: 312
  },
  {
    id: '11',
    trainNumber: 'G4567',
    departStation: { code: 'HZH', name: '杭州' },
    arriveStation: { code: 'SHH', name: '上海' },
    departTime: '11:15',
    arriveTime: '12:30',
    duration: '1小时15分',
    price: {
      business: 340,
      firstClass: 220,
      secondClass: 150,
    },
    distance: 202
  },
  {
    id: '12',
    trainNumber: 'T7890',
    departStation: { code: 'NJH', name: '南京' },
    arriveStation: { code: 'SHH', name: '上海' },
    departTime: '13:40',
    arriveTime: '15:25',
    duration: '1小时45分',
    price: {
      firstClass: 210,
      secondClass: 130,
      hardSeat: 90,
    },
    distance: 301
  },
]

export const useTrainStore = create<TrainState>()(
  persist(
    (set) => ({
      stations: mockStations,
      trains: mockTrains,
      searchHistory: [],
      
      addSearchHistory: (from, to, date) => 
        set((state) => ({
          searchHistory: [
            {
              id: crypto.randomUUID(),
              from,
              to,
              date,
              timestamp: Date.now()
            },
            ...state.searchHistory.slice(0, 9) // 只保留最近10条记录
          ]
        })),
        
      clearSearchHistory: () => 
        set({ searchHistory: [] }),
        
      deleteSearchHistory: (id) =>
        set((state) => ({
          searchHistory: state.searchHistory.filter((history) => history.id !== id)
        })),
    }),
    {
      name: 'train-storage',
    }
  )
) 
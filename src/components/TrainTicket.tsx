'use client'

import { useTrainStore, type Station, type Train } from '@/store/train'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useMemo } from 'react'
import { toast } from 'sonner'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { 
  CalendarIcon, 
  ArrowRightIcon, 
  SearchIcon, 
  ClockIcon, 
  TrainIcon, 
  MapPinIcon,
  HistoryIcon,
  ArrowLeftRight as SwitchIcon,
  XIcon
} from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

/**
 * @description 列车价格组件
 */
const TrainPriceTag = ({ label, price }: { label: string; price?: number }) => {
  if (!price) return null;
  
  return (
    <div className="text-xs space-y-0.5">
      <div className="text-gray-500">{label}</div>
      <div className="font-medium">¥ {price}</div>
    </div>
  );
};

/**
 * @description 列车卡片组件
 */
const TrainCard = ({ train }: { train: Train }) => {
  return (
    <Card className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-50 text-blue-500 h-8 w-8 rounded-full flex items-center justify-center">
              <TrainIcon className="h-4 w-4" />
            </div>
            <div>
              <div className="font-medium">{train.trainNumber}</div>
              <div className="text-xs text-gray-500">{train.distance}公里</div>
            </div>
          </div>
          <Button size="sm" className="text-xs">选择</Button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-1">
            <div className="text-xl font-semibold">{train.departTime}</div>
            <div className="text-sm text-gray-700">{train.departStation.name}</div>
          </div>
          
          <div className="space-y-1 text-right">
            <div className="text-xl font-semibold">{train.arriveTime}</div>
            <div className="text-sm text-gray-700">{train.arriveStation.name}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-center py-2">
          <div className="flex items-center text-xs text-gray-500">
            <ClockIcon className="h-3 w-3 mr-1" />
            {train.duration}
          </div>
        </div>
        
        <Separator className="my-3" />
        
        <div className="flex justify-between">
          {train.price.business && <TrainPriceTag label="商务座" price={train.price.business} />}
          {train.price.firstClass && <TrainPriceTag label="一等座" price={train.price.firstClass} />}
          {train.price.secondClass && <TrainPriceTag label="二等座" price={train.price.secondClass} />}
          {train.price.softSleeper && <TrainPriceTag label="软卧" price={train.price.softSleeper} />}
          {train.price.hardSleeper && <TrainPriceTag label="硬卧" price={train.price.hardSleeper} />}
          {train.price.hardSeat && <TrainPriceTag label="硬座" price={train.price.hardSeat} />}
          {train.price.noSeat && <TrainPriceTag label="无座" price={train.price.noSeat} />}
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * @description 搜索历史项组件
 */
const SearchHistoryItem = ({ 
  history, 
  onSelect, 
  onDelete 
}: { 
  history: {
    id: string;
    from: Station;
    to: Station;
    date: string;
    timestamp: number;
  };
  onSelect: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <button 
        className="flex-1 cursor-pointer text-left bg-transparent border-0 p-0" 
        onClick={onSelect}
        aria-label="选择历史记录"
        type="button"
      >
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">{history.from.name} → {history.to.name}</div>
          <div className="text-xs text-gray-500">{history.date}</div>
        </div>
      </button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-7 w-7"
        onClick={onDelete}
      >
        <XIcon className="h-3 w-3 text-gray-400" />
      </Button>
    </div>
  );
};

/**
 * @description 火车票查询组件
 */
export const TrainTicketApp = () => {
  const { stations, trains, searchHistory, addSearchHistory, deleteSearchHistory } = useTrainStore()
  
  const [fromStation, setFromStation] = useState<Station | null>(null)
  const [toStation, setToStation] = useState<Station | null>(null)
  const [date, setDate] = useState<Date | undefined>(new Date())
  
  const [showResults, setShowResults] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  
  // 格式化日期
  const formattedDate = useMemo(() => {
    return date ? format(date, 'yyyy-MM-dd') : ''
  }, [date])
  
  // 计算可用的火车
  const availableTrains = useMemo(() => {
    if (!fromStation || !toStation) return []
    
    return trains.filter(train => 
      (train.departStation.code === fromStation.code && train.arriveStation.code === toStation.code)
    )
  }, [trains, fromStation, toStation])
  
  // 搜索火车票
  const handleSearch = () => {
    if (!fromStation) {
      toast.error('请选择出发站')
      return
    }
    
    if (!toStation) {
      toast.error('请选择到达站')
      return
    }
    
    if (!date) {
      toast.error('请选择出发日期')
      return
    }
    
    // 添加到历史记录
    addSearchHistory(fromStation, toStation, formattedDate)
    
    // 显示结果
    setShowResults(true)
    setShowHistory(false)
    
    if (availableTrains.length === 0) {
      toast.info('很抱歉，未找到符合条件的车次')
    } else {
      toast.success(`找到 ${availableTrains.length} 个符合条件的车次`)
    }
  }
  
  // 交换出发站和到达站
  const handleSwapStations = () => {
    const temp = fromStation
    setFromStation(toStation)
    setToStation(temp)
  }
  
  // 处理选择历史记录
  const handleSelectHistory = (history: typeof searchHistory[0]) => {
    setFromStation(history.from)
    setToStation(history.to)
    setDate(new Date(history.date))
    setShowHistory(false)
  }
  
  // 处理删除历史记录
  const handleDeleteHistory = (id: string) => {
    deleteSearchHistory(id)
  }
  
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border border-gray-100 shadow-sm">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-lg font-medium">火车票查询</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Select
                value={fromStation?.code}
                onValueChange={(value) => {
                  const station = stations.find(s => s.code === value)
                  setFromStation(station || null)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="出发站" />
                </SelectTrigger>
                <SelectContent>
                  {stations.map((station) => (
                    <SelectItem key={station.code} value={station.code}>
                      {station.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="absolute right-10 top-0 bottom-0 flex items-center pointer-events-none">
                <MapPinIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={handleSwapStations}
            >
              <SwitchIcon className="h-4 w-4" />
            </Button>
            
            <div className="relative flex-1">
              <Select
                value={toStation?.code}
                onValueChange={(value) => {
                  const station = stations.find(s => s.code === value)
                  setToStation(station || null)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="到达站" />
                </SelectTrigger>
                <SelectContent>
                  {stations.map((station) => (
                    <SelectItem key={station.code} value={station.code}>
                      {station.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="absolute right-10 top-0 bottom-0 flex items-center pointer-events-none">
                <MapPinIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'yyyy年MM月dd日') : <span>出发日期</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <Button onClick={handleSearch} className="gap-1">
              <SearchIcon className="h-4 w-4" />
              查询
            </Button>
          </div>
          
          {searchHistory.length > 0 && (
            <div className="pt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-gray-500"
                onClick={() => setShowHistory(!showHistory)}
              >
                <HistoryIcon className="h-3 w-3 mr-1" />
                {showHistory ? '隐藏搜索历史' : '查看搜索历史'}
              </Button>
              
              {showHistory && (
                <div className="mt-2 bg-gray-50 p-3 rounded-md max-h-40 overflow-y-auto">
                  {searchHistory.map((history) => (
                    <SearchHistoryItem 
                      key={history.id} 
                      history={history}
                      onSelect={() => handleSelectHistory(history)}
                      onDelete={() => handleDeleteHistory(history.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      {showResults && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">查询结果</h3>
            <div className="text-sm text-gray-500">
              {fromStation?.name} → {toStation?.name} · {formattedDate}
            </div>
          </div>
          
          {availableTrains.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="text-gray-400 mb-2">
                <TrainIcon className="h-12 w-12 mx-auto" />
              </div>
              <p className="text-gray-600">很抱歉，未找到符合条件的车次</p>
              <p className="text-sm text-gray-500 mt-1">请尝试更改出发地、目的地或日期</p>
            </div>
          ) : (
            <div className="space-y-4">
              {availableTrains.map((train) => (
                <TrainCard key={train.id} train={train} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
} 
'use client'

import { useTodoStore } from '@/store/todo'
import type { Todo } from '@/store/todo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { toast } from 'sonner'
import { Trash2, Check, Plus } from 'lucide-react'

/**
 * @description 单个待办事项组件
 */
const TodoItem = ({ todo }: { todo: Todo }) => {
  const { toggleTodo, deleteTodo } = useTodoStore()

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <Checkbox 
          id={todo.id}
          checked={todo.completed}
          onCheckedChange={() => toggleTodo(todo.id)}
        />
        <label
          htmlFor={todo.id}
          className={`text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
        >
          {todo.text}
        </label>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => deleteTodo(todo.id)}
        className="h-8 w-8"
      >
        <Trash2 className="h-4 w-4 text-gray-500" />
      </Button>
    </div>
  )
}

/**
 * @description 待办事项列表组件
 */
export const TodoList = () => {
  const { todos, addTodo, clearCompleted } = useTodoStore()
  const [newTodo, setNewTodo] = useState('')

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim() === '') {
      toast.error('待办事项不能为空')
      return
    }
    addTodo(newTodo.trim())
    setNewTodo('')
    toast.success('已添加新的待办事项')
  }

  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-center">待办事项</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleAddTodo} className="flex space-x-2">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="添加新待办事项..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </form>

        <Separator />
        
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 py-4">暂无待办事项</p>
        ) : (
          <div className="space-y-1 max-h-[300px] overflow-y-auto pr-2">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </CardContent>
      
      {todos.length > 0 && (
        <CardFooter className="flex justify-between border-t pt-4">
          <p className="text-sm text-gray-500">
            {completedCount} / {todos.length} 已完成
          </p>
          {completedCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearCompleted}
              className="flex items-center gap-1 text-xs"
            >
              <Check className="h-3 w-3" />
              清除已完成
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
} 
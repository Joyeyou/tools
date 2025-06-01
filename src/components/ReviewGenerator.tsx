'use client'

import { useReviewStore, type ReviewType, type ReviewTemplate } from '@/store/review'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState, useMemo } from 'react'
import { toast } from 'sonner'
import { Clipboard, Copy, Star, Trash2, Save, FileText, Edit } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

/**
 * @description 星级评分组件
 */
const StarRating = ({ rating, onChange }: { rating: number; onChange?: (rating: number) => void }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          className="focus:outline-none"
          disabled={!onChange}
        >
          <Star 
            className={cn(
              'h-5 w-5',
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            )} 
          />
        </button>
      ))}
    </div>
  )
}

/**
 * @description 评论模板卡片
 */
const ReviewTemplateCard = ({ 
  template,
  onSelect
}: { 
  template: ReviewTemplate;
  onSelect: (template: ReviewTemplate) => void;
}) => {
  return (
    <Card className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{template.title}</CardTitle>
          <StarRating rating={template.rating} />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-gray-600 line-clamp-3">
          {template.content}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onSelect(template)}
          className="text-xs"
        >
          <Edit className="h-3 w-3 mr-1" />
          使用此模板
        </Button>
      </CardFooter>
    </Card>
  )
}

/**
 * @description 已保存评论卡片
 */
const SavedReviewCard = ({ 
  review,
  onDelete
}: { 
  review: ReviewTemplate;
  onDelete: (id: string) => void;
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(review.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast.success('评论已复制到剪贴板')
  }

  return (
    <Card className="overflow-hidden border border-gray-100 shadow-sm">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-medium">{review.title}</CardTitle>
            <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
              {review.type === 'restaurant' ? '餐厅' : '酒店'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <StarRating rating={review.rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-gray-600">
          {review.content}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onDelete(review.id)}
          className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-3 w-3 mr-1" />
          删除
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopy}
          className="text-xs"
        >
          {copied ? (
            <>
              <Clipboard className="h-3 w-3 mr-1" />
              已复制
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 mr-1" />
              复制评论
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

/**
 * @description 评论编辑器
 */
const ReviewEditor = ({ 
  type,
  initialTemplate,
  onSave,
  onCancel
}: { 
  type: ReviewType;
  initialTemplate?: ReviewTemplate;
  onSave: (review: Omit<ReviewTemplate, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}) => {
  const [title, setTitle] = useState(initialTemplate?.title || '')
  const [content, setContent] = useState(initialTemplate?.content || '')
  const [rating, setRating] = useState(initialTemplate?.rating || 5)
  
  // 根据评论类型提供不同的占位符字段
  const placeholders = useMemo(() => {
    if (type === 'restaurant') {
      return {
        field1: '食物',
        field2: '特色菜'
      }
    } else {
      return {
        field1: '房型',
        field2: '设施'
      }
    }
  }, [type])
  
  const [field1, setField1] = useState('')
  const [field2, setField2] = useState('')
  
  // 处理占位符替换
  const processedContent = useMemo(() => {
    let result = content
    if (field1) {
      result = result.replace(/{{食物}}/g, field1).replace(/{{房型}}/g, field1)
    }
    if (field2) {
      result = result.replace(/{{特色菜}}/g, field2).replace(/{{设施}}/g, field2)
    }
    return result
  }, [content, field1, field2])
  
  const handleSave = () => {
    if (!title.trim()) {
      toast.error('请输入评论标题')
      return
    }
    
    if (!content.trim()) {
      toast.error('请输入评论内容')
      return
    }
    
    onSave({
      type,
      title,
      content: processedContent,
      rating
    })
  }
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">评论标题</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="输入评论标题"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="rating">评分</Label>
          <StarRating rating={rating} onChange={setRating} />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="field1">{type === 'restaurant' ? '食物名称' : '房间类型'}</Label>
          <Input
            id="field1"
            value={field1}
            onChange={(e) => setField1(e.target.value)}
            placeholder={`输入${placeholders.field1}`}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="field2">{type === 'restaurant' ? '特色菜品' : '酒店设施'}</Label>
          <Input
            id="field2"
            value={field2}
            onChange={(e) => setField2(e.target.value)}
            placeholder={`输入${placeholders.field2}`}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">评论内容</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="输入评论内容"
          rows={6}
        />
      </div>
      
      <div className="p-4 bg-gray-50 rounded-md">
        <h4 className="text-sm font-medium mb-2">预览：</h4>
        <p className="text-sm text-gray-600">{processedContent}</p>
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button variant="outline" onClick={onCancel}>取消</Button>
        <Button onClick={handleSave}>保存评论</Button>
      </div>
    </div>
  )
}

/**
 * @description 评论生成器组件
 */
export const ReviewGeneratorApp = () => {
  const { templates, savedReviews, saveReview, deleteSavedReview } = useReviewStore()
  const [activeTab, setActiveTab] = useState<ReviewType>('restaurant')
  const [selectedTemplate, setSelectedTemplate] = useState<ReviewTemplate | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  
  const filteredTemplates = templates.filter(template => template.type === activeTab)
  
  const handleSelectTemplate = (template: ReviewTemplate) => {
    setSelectedTemplate(template)
    setIsEditing(true)
  }
  
  const handleSaveReview = (review: Omit<ReviewTemplate, 'id' | 'createdAt'>) => {
    saveReview(review)
    setIsEditing(false)
    setSelectedTemplate(null)
    toast.success('评论已保存')
  }
  
  const handleCancelEdit = () => {
    setIsEditing(false)
    setSelectedTemplate(null)
  }
  
  return (
    <div className="space-y-6">
      <Tabs 
        defaultValue="restaurant" 
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ReviewType)}
        className="w-full"
      >
        <TabsList className="w-full mb-4">
          <TabsTrigger value="restaurant" className="flex-1">餐厅评论</TabsTrigger>
          <TabsTrigger value="hotel" className="flex-1">酒店评论</TabsTrigger>
        </TabsList>
        
        <TabsContent value="restaurant" className="space-y-6">
          {isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>编辑餐厅评论</CardTitle>
              </CardHeader>
              <CardContent>
                <ReviewEditor 
                  type="restaurant"
                  initialTemplate={selectedTemplate || undefined}
                  onSave={handleSaveReview}
                  onCancel={handleCancelEdit}
                />
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTemplates.map((template) => (
                <ReviewTemplateCard 
                  key={template.id} 
                  template={template} 
                  onSelect={handleSelectTemplate}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="hotel" className="space-y-6">
          {isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>编辑酒店评论</CardTitle>
              </CardHeader>
              <CardContent>
                <ReviewEditor 
                  type="hotel"
                  initialTemplate={selectedTemplate || undefined}
                  onSave={handleSaveReview}
                  onCancel={handleCancelEdit}
                />
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTemplates.map((template) => (
                <ReviewTemplateCard 
                  key={template.id} 
                  template={template} 
                  onSelect={handleSelectTemplate}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {savedReviews.length > 0 && (
        <>
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">已保存的评论</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedReviews.map((review) => (
                <SavedReviewCard 
                  key={review.id} 
                  review={review}
                  onDelete={deleteSavedReview}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
} 
/**
 * @description 评论生成器存储
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ReviewType = 'restaurant' | 'hotel'

export interface ReviewTemplate {
  id: string
  type: ReviewType
  title: string
  content: string
  rating: number
  createdAt: number
}

interface ReviewState {
  templates: ReviewTemplate[]
  savedReviews: ReviewTemplate[]
  addTemplate: (template: Omit<ReviewTemplate, 'id' | 'createdAt'>) => void
  deleteTemplate: (id: string) => void
  saveReview: (review: Omit<ReviewTemplate, 'id' | 'createdAt'>) => void
  deleteSavedReview: (id: string) => void
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set) => ({
      templates: [
        // 餐厅评论模板
        {
          id: '1',
          type: 'restaurant',
          title: '美食体验',
          content: '这家餐厅的氛围非常好，服务员态度友好。我点的{{食物}}味道鲜美，尤其是{{特色菜}}令人难忘。价格合理，值得推荐给朋友。',
          rating: 5,
          createdAt: Date.now()
        },
        {
          id: '2',
          type: 'restaurant',
          title: '一般体验',
          content: '这家餐厅环境还不错，但服务有待提高。{{食物}}的味道一般，不过{{特色菜}}倒是挺有特色。价格略贵，性价比不高。',
          rating: 3,
          createdAt: Date.now()
        },
        {
          id: '3',
          type: 'restaurant',
          title: '失望体验',
          content: '很遗憾这次用餐体验不佳。服务态度冷淡，等餐时间过长。{{食物}}味道平平，{{特色菜}}与描述相差甚远。价格昂贵，不值得。',
          rating: 2,
          createdAt: Date.now()
        },
        // 酒店评论模板
        {
          id: '4',
          type: 'hotel',
          title: '舒适住宿',
          content: '这家酒店位置优越，交通便利。房间干净整洁，{{房型}}宽敞舒适。酒店的{{设施}}非常好用。员工热情周到，服务一流。下次还会选择入住。',
          rating: 5,
          createdAt: Date.now()
        },
        {
          id: '5',
          type: 'hotel',
          title: '一般住宿',
          content: '酒店地理位置还可以。{{房型}}的条件基本符合预期，但{{设施}}略显陈旧。服务人员态度友好但效率不高。总体来说体验一般。',
          rating: 3,
          createdAt: Date.now()
        },
        {
          id: '6',
          type: 'hotel',
          title: '失望住宿',
          content: '非常失望的住宿体验。{{房型}}与网站描述不符，{{设施}}老旧且不干净。服务人员态度冷漠。价格与实际体验严重不符，不推荐入住。',
          rating: 1,
          createdAt: Date.now()
        }
      ],
      savedReviews: [],
      
      addTemplate: (template) => 
        set((state) => ({
          templates: [
            ...state.templates,
            {
              ...template,
              id: crypto.randomUUID(),
              createdAt: Date.now()
            }
          ]
        })),
        
      deleteTemplate: (id) =>
        set((state) => ({
          templates: state.templates.filter((template) => template.id !== id)
        })),
        
      saveReview: (review) =>
        set((state) => ({
          savedReviews: [
            {
              ...review,
              id: crypto.randomUUID(),
              createdAt: Date.now()
            },
            ...state.savedReviews
          ]
        })),
        
      deleteSavedReview: (id) =>
        set((state) => ({
          savedReviews: state.savedReviews.filter((review) => review.id !== id)
        })),
    }),
    {
      name: 'review-storage',
    }
  )
) 
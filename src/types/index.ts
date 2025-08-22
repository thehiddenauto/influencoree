export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface Video {
  id: string
  title: string
  description?: string
  url?: string
  thumbnail?: string
  status: 'processing' | 'completed' | 'failed'
  views: number
  created_at: string
  updated_at: string
  user_id: string
}

export interface VideoGenerationRequest {
  prompt: string
  duration?: number
  style?: string
  quality?: 'draft' | 'standard' | 'high'
}

export interface ApiResponse<T> {
  data: T
  error?: string
  message?: string
}

export interface AuthError {
  message: string
  status?: number
}

export interface DashboardStats {
  totalVideos: number
  totalViews: number
  engagementRate: number
  followers: number
}
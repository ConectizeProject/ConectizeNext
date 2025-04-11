export type Status = 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done'

export type Priority = 'low' | 'medium' | 'high'

export type Task = {
  id: string
  title: string
  description: string | null
  status: Status
  priority: Priority
  dueDate: Date | null
  userId: string | undefined
  createdAt: Date
  updatedAt: Date
}

export type RoadmapColumn = {
  id: string
  title: string
  status: Status
  position: number
  userId: string | undefined
  createdAt: Date
  updatedAt: Date
} 
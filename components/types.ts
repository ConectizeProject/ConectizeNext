// Status possível de uma tarefa ou coluna
export type Status = 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done'

// Prioridade da tarefa
export type Priority = 'low' | 'medium' | 'high'

// Representação de uma tarefa no app
export type Task = {
  id: string
  title: string
  description: string // nunca null no app, sempre string
  status: Status
  priority: Priority
  dueDate: Date | null
  userId: string // sempre string, nunca undefined
  createdAt: Date
  updatedAt: Date
}

// Representação de uma coluna do roadmap
export type RoadmapColumn = {
  id: string
  title: string
  status: Status
  position: number
  userId: string // sempre string, nunca undefined
  createdAt: Date
  updatedAt: Date
} 
declare interface Todo {
  id: number
  title: string
  completed: boolean
  subtasks: Subtask[] | string[]
  subtasksVisible?: boolean
}

declare interface Subtask {
  id: number
  title: string
  completed: boolean
}
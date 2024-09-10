declare interface Todo {
  id: number
  title: string
  completed: boolean
  subtasks: Subtask[] | string[]
  subtasksLoaded?: boolean
}

declare interface Subtask {
  id: number
  title: string
  completed: boolean
}
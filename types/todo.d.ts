declare interface Todo {
  id: number
  title: string
  done: boolean
  subtasks: string[]
  children?: Subtask[]
  subtasksVisible: boolean
}

declare interface Subtask {
  id: number
  title: string
  done: boolean
}
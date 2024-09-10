import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])

  async function fetchTodos() {
    const { data } = await useFetch('http://51.83.230.116:9000/tasks')
    todos.value = data.value as Todo[]

    for (let i = 0; i < todos.value.length; i++) {
      const subtasks = await fetchSubtasks(todos.value[i]);
      todos.value[i].subtasks = subtasks
      todos.value[i].subtasksLoaded = true
    }
  }

  async function fetchSubtasks(todo: Todo) {
    const subtasks: Subtask[] = []

    for (const subtask of todo.subtasks) {
      const { data } = await useFetch(`http://51.83.230.116:9000/subtasks/${subtask}`)
      if (data.value) {
        subtasks.push(data.value as Subtask)
      }
    }

    subtasks.sort((a,b) => {
      if (a.title < b.title) return -1
      if (a.title > b.title) return 1
      return 0
    })

    return subtasks
  }

  return {
    todos,
    fetchTodos,
  }
})
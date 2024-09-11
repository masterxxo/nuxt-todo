import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const tasksLoaded = ref(false);
  const config = useRuntimeConfig()

  async function fetchTodos() {
    const { data } = await useFetch('/tasks', { baseURL: config.public.baseURL })
    todos.value = data.value as Todo[]
    

    for (let i = 0; i < todos.value.length; i++) {
      todos.value[i].subtasksVisible = false;
      todos.value[i].children = await fetchSubtasks(todos.value[i]);
    }

    tasksLoaded.value = true;
  }

  async function fetchSubtasks(todo: Todo) {
    const subtasks: Subtask[] = []

    for (const subtask of todo.subtasks) {
      const { data } = await useFetch(`/subtasks/${subtask}`, { baseURL: config.public.baseURL })
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

  function updateSubtask(todo: Todo) {
    if(todo.done === false) {
      todo.done = todo.children?.every(child => child.done) ?? false
    }
  }

  return {
    todos,
    tasksLoaded,
    fetchTodos,
    updateSubtask
  }
})
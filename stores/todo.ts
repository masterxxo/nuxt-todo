import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const tasksLoaded = ref(false);

  async function fetchTodos() {
    const { data } = await useFetch('http://51.83.230.116:9000/tasks')
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

  function updateSubtask(todo: Todo) {
    todo.done = todo.children?.every(child => child.done) ?? false
  }

  return {
    todos,
    tasksLoaded,
    fetchTodos,
    updateSubtask
  }
})
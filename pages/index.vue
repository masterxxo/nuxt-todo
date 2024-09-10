<script setup lang="ts">
const todoStore = useTodoStore()

const subtaskVisible = ref(false)

todoStore.fetchTodos();
</script>
<template>
  <div>
    <ul>
      <li v-for="todo in todoStore.todos" :key="todo.id">
        {{ todo.title }}
        <input type="checkbox" v-model="todo.completed" />
        <ul v-if="todo.subtasksLoaded" class="pl-4">
          <li v-for="subtask in todo.subtasks" :key="subtask.id">
            {{ subtask.title }}
            <input type="checkbox" v-model="subtask.completed" />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
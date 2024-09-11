<script setup lang="ts">
const todoStore = useTodoStore()

todoStore.fetchTodos();
</script>
<template>
  <div>
    <Loader v-if="!todoStore.tasksLoaded" />
    <ul v-else>
      <li
        v-for="todo in todoStore.todos"
        :key="todo.id"
        class="p-2"
      >
        <div class="flex items-center space-x-2">
          <input
            type="checkbox"
            v-model="todo.done"
            @change="todoStore.updateSubtask(todo)"
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <button
            @click="todo.subtasksVisible = !todo.subtasksVisible"
            class="flex items-center space-x-2"
          >
            <span>{{ todo.title }}</span>
            <Indicator
              v-if="todo.children && todo.children.length > 0"
              :class="{ 'rotate-180': todo.subtasksVisible }"
            />
          </button>
        </div>
        <div :class="{ 'hidden': !todo.subtasksVisible }">
          <ul class="pl-4 mt-2">
            <li v-for="subtask in todo.children" :key="subtask.id">
              <input
                type="checkbox"
                v-model="subtask.done"
                @change="todoStore.updateSubtask(todo)"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              {{ subtask.title }}
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
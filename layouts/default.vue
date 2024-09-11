<template>
  <div class="min-h-screen flex flex-col">
    <header class="px-6 py-4 border-b border-gray-200">
      <h1 class="text-2xl font-bold">Todo App</h1>
    </header>
    <main class="p-6 flex-grow">
      <slot />
    </main>
    <footer class="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
      <h2 class="font-bold">Todo App</h2>
      <p class="text-gray-500">Made by <a class="underline" href="https://github.com/masterxxo" target="_blank">Mateusz Róg</a></p>
    </footer>
  </div>
</template>
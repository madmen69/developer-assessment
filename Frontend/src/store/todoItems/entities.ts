import { createEntityAdapter } from '@reduxjs/toolkit'

export type TodoItem = { todoItemId: string; description: string; isCompleted: boolean }

export const todoItemsAdapter = createEntityAdapter<TodoItem>({
    selectId: (todoItem) => todoItem.todoItemId,
    sortComparer: (a, b) => a.description.localeCompare(b.description),
})

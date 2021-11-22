import { createEntityAdapter } from '@reduxjs/toolkit'

export type TodoItem = { id: string; description: string; isCompleted: boolean }

export const todoItemsAdapter = createEntityAdapter<TodoItem>({
    selectId: (todoItem) => todoItem.id,
    sortComparer: (a, b) => a.description.localeCompare(b.description),
})

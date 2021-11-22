import { createSelector } from '@reduxjs/toolkit'
import { todoItemsAdapter } from './entities'
import { RootState } from './slice'

// Can create a set of memoized selectors based on the location of this entity state
export const todoItemsSelector = todoItemsAdapter.getSelectors<RootState>((state) => state.todoItems)
export const createErrorMessageSelector = (state) => state.todoItems.createErrorMessage
export const todoItemStateSelector = (state) => state.todoItems

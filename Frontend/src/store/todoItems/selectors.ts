import { createSelector } from '@reduxjs/toolkit'
import { todoItemsAdapter } from './entities'
import { RootState } from './slice'

// Can create a set of memoized selectors based on the location of this entity state
export const todoItemsSelector = todoItemsAdapter.getSelectors<RootState>((state) => state.todoItems)
export const errorMessageSelector = (state) => state.todoItems.errorMessage
export const todoItemStateSelector = (state) => state.todoItems

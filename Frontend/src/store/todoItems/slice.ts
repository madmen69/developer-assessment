import { createSlice, PayloadAction, combineReducers, createAction } from '@reduxjs/toolkit'
import { todoItemsAdapter, TodoItem } from './entities'

export const initialState = todoItemsAdapter.getInitialState({
    createErrorMessage: '',
})

const todoItemsSlice = createSlice({
    name: 'todoItems',
    initialState,
    reducers: {
        todoItemCreate: (state, action: PayloadAction<string>) => {
            state.createErrorMessage = ''
        },
        todoItemCreateFailed: (state, action: PayloadAction<string>) => {
            state.createErrorMessage = action.payload
        },
        todoItemAdded: todoItemsAdapter.addOne,
        todoItemsRefresh: (state) => {
            state.entities = {}
            state.ids = []
        },
        todoItemsReceived: (state, action) => {
            todoItemsAdapter.setAll(state, action.payload)
        },
        todoItemUpdated: todoItemsAdapter.upsertOne,
    },
})

export const todoItemUpdate = createAction<TodoItem>('todoItems/todoItemUpdate')

export const {
    todoItemCreate,
    todoItemAdded,
    todoItemsReceived,
    todoItemUpdated,
    todoItemsRefresh,
    todoItemCreateFailed,
} = todoItemsSlice.actions

export const rootReducer = combineReducers({
    todoItems: todoItemsSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

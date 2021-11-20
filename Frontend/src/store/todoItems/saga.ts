import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLeading } from 'redux-saga/effects'
import { todoItemAdded, todoItemCreate, todoItemsRefresh, todoItemUpdate, todoItemUpdated } from './slice'
import { v4 as uuidv4 } from 'uuid'
import { TodoItem } from './entities'

export function* todoItemCreateWorker(action: PayloadAction<string>) {
    yield put(
        todoItemAdded({
            todoItemId: uuidv4(),
            description: action.payload,
            isCompleted: false,
        })
    )
}

export function* todoItemUpdateWorker(action: PayloadAction<TodoItem>) {
    const xx = action.payload
    yield put(todoItemUpdated({ ...xx, ...{ isCompleted: true } }))
}

export function* todoItemRefreshWorker() {
    console.error('refresh')
}

export function* todoItemsSaga() {
    yield takeLeading(todoItemCreate.type, todoItemCreateWorker)
    yield takeLeading(todoItemUpdate.type, todoItemUpdateWorker)
    yield takeLeading(todoItemsRefresh.type, todoItemRefreshWorker)
}

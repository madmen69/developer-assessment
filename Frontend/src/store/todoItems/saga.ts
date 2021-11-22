import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLeading } from 'redux-saga/effects'
import {
    todoItemAdded,
    todoItemCreate,
    todoItemsRefresh,
    todoItemsReceived,
    todoItemUpdate,
    todoItemUpdated,
    todoItemCreateFailed,
} from './slice'
import { v4 as uuidv4 } from 'uuid'
import { API_BASE_URL } from '../../constants'
import axios from 'axios'
import { TodoItem } from './entities'

export function* todoItemCreateWorker(action: PayloadAction<string>) {
    try {
        const newTodoItem = {
            id: uuidv4(),
            description: action.payload,
            isCompleted: false,
        }

        const result = yield call(axios.post, API_BASE_URL, newTodoItem)
        yield put(todoItemAdded(result.data))
    } catch (err: any) {
        yield put(todoItemCreateFailed(err?.response?.data || 'unknown error'))
    }
}

export function* todoItemUpdateWorker(action: PayloadAction<TodoItem>) {
    try {
        const payload = { ...action.payload, ...{ isCompleted: true } }
        yield call(axios.put, `${API_BASE_URL}/${payload.id}`, payload)
        yield put(todoItemUpdated(payload))
    } catch (err: any) {}
}

export function* todoItemRefreshWorker() {
    try {
        const result = yield call(axios.get, API_BASE_URL)
        yield put(todoItemsReceived(result.data))
    } catch (err: any) {}
}

export function* todoItemsSaga() {
    yield takeLeading(todoItemCreate.type, todoItemCreateWorker)
    yield takeLeading(todoItemUpdate.type, todoItemUpdateWorker)
    yield takeLeading(todoItemsRefresh.type, todoItemRefreshWorker)
}

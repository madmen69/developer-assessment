import { fork } from 'redux-saga/effects'
import { todoItemsSaga } from './todoItems/saga'

export default function* rootSaga() {
    yield fork(todoItemsSaga)
}

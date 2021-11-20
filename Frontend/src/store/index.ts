import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from './todoItems/slice'
import saga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()
const isDevMode = process.env.NODE_ENV === 'development'
export const store = configureStore({
    reducer: rootReducer,
    devTools: isDevMode,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})
sagaMiddleware.run(saga)

export default store

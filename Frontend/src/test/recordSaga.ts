import { RootState } from '../store/todoItems/slice'
import { runSaga, stdChannel } from 'redux-saga'

// Testing without any helper library involves manually stepping through the saga function and asserting effects as needed (bad approach).
// A better way is to run the whole saga - https://dev.to/phil/the-best-way-to-test-redux-sagas-4hib
// Setup the conditions of our test, instruct the saga to run through everything and finish its business, and then check that the expected side effects have happened.

// For more testing strategies - https://blog.scottlogic.com/2018/01/16/evaluating-redux-saga-test-libraries.html

export const recordSaga = async (saga, initialAction, currentState?: RootState) => {
    const dispatched = []

    await runSaga(
        {
            channel: stdChannel(),
            // @ts-ignore
            dispatch: (action) => dispatched.push(action),
            getState: () => currentState,
        },
        saga,
        initialAction
    ).toPromise()

    return dispatched
}

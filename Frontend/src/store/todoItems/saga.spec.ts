import { recordSaga } from '../../test'
import { todoItemCreateFailed, todoItemAdded } from './slice'
import { todoItemCreateWorker } from './saga'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v4 as uuidv4 } from 'uuid'
import { API_BASE_URL } from '../../constants'


const mockData = {
    todoItems: {
        ids: [],
        entities: {},
        createErrorMessage: '',
    },
}


describe('Create new todo item', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should create successfully', async () => {
        // arrange
        const mock = new MockAdapter(axios)
        const item = {
            id: uuidv4(),
            description: "hello",
            isCompleted: false,
        }

        const data = { ...item }
        mock.onPost(API_BASE_URL).reply(200, data)

        // act
        const dispatched = await recordSaga(todoItemCreateWorker, {payload: 'hello'} , mockData)

        // assert
        expect(dispatched[0]).toEqual(todoItemAdded(item))
    })

    it('should fail when response from api has error', async () => {
        // arrange
        const mock = new MockAdapter(axios)
        const errorMessage = "message"
        mock.onPost(API_BASE_URL).reply(400, errorMessage)

        // act
        const dispatched = await recordSaga(todoItemCreateWorker, {payload: 'hello'} , mockData)

        // assert
        expect(dispatched[0]).toEqual(todoItemCreateFailed(errorMessage))
    })
})

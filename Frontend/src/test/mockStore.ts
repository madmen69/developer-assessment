import configureMockStore from 'redux-mock-store'

export const mockStore = configureMockStore([])
export const getMockStore = (overrideParams?: any) => {
    const mockData = {
        todoItems: {
            ids: [],
            entities: {},
            errorMessage: '',
            ...overrideParams,
        },
    }
    return mockStore(mockData)
}

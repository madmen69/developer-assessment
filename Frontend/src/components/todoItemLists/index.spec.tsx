import React from 'react'
import { TodoItemLists } from './index'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { getMockStore } from '../../test'

describe('Add Todo Item form', () => {
    it('should render without crashing when todo item list is empty', async () => {
        render(
            <Provider store={getMockStore()}>
                <TodoItemLists />
            </Provider>
        )

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Showing 0 item')
    })

    it('should render without crashing when todo item list has 1 item', async () => {
        render(
            <Provider
                store={getMockStore({
                    entities: {
                        '5e3a7ad5-a282-4a27-94d3-20b21c925749': {
                            id: '5e3a7ad5-a282-4a27-94d3-20b21c925749',
                            description: 'hell',
                            isCompleted: false,
                        },
                    },
                    ids: ['5e3a7ad5-a282-4a27-94d3-20b21c925749'],
                })}
            >
                <TodoItemLists />
            </Provider>
        )

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Showing 1 item')
        expect(screen.getByRole('button', { name: /Mark as completed/ })).not.toBeDisabled()
    })

    it('should render mark as completed button as disabled when isCompleted is true', async () => {
        render(
            <Provider
                store={getMockStore({
                    entities: {
                        '5e3a7ad5-a282-4a27-94d3-20b21c925749': {
                            id: '5e3a7ad5-a282-4a27-94d3-20b21c925749',
                            description: 'hell',
                            isCompleted: true,
                        },
                    },
                    ids: ['5e3a7ad5-a282-4a27-94d3-20b21c925749'],
                })}
            >
                <TodoItemLists />
            </Provider>
        )

        expect(screen.getByRole('button', { name: /Mark as completed/ })).toBeDisabled()
    })
})

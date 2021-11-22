import React from 'react'
import { AddTodoItemForm } from './index'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { getMockStore } from '../../test'

describe('Add Todo Item form', () => {
    it('should render without crashing when loading the form', async () => {
        render(
            <Provider store={getMockStore()}>
                <AddTodoItemForm />
            </Provider>
        )

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Add Item')
        expect(screen.getByRole('textbox', { name: /Description/ })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Add item/ })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Clear/ })).toBeInTheDocument()
        expect(screen.getByText(/Complete the todo item form with description/)).toBeInTheDocument()
    })

    it('should render the error message when it exist', async () => {
        render(
            <Provider store={getMockStore({ createErrorMessage: 'I got an error' })}>
                <AddTodoItemForm />
            </Provider>
        )

        expect(screen.queryByText(/Complete the todo item form with description/)).not.toBeInTheDocument()
        expect(screen.getByText(/I got an error/)).toBeInTheDocument()
    })

    it('should clear the input when clear button is clicked', async () => {
        render(
            <Provider store={getMockStore()}>
                <AddTodoItemForm />
            </Provider>
        )

        const descriptionTextInput = screen.getByRole('textbox', { name: /Description/ })
        userEvent.type(descriptionTextInput, 'go to hair dresser')

        expect(descriptionTextInput).toHaveValue('go to hair dresser')
        userEvent.click(screen.getByRole('button', { name: /Clear/ }))
        expect(descriptionTextInput).toHaveValue('')
    })
})

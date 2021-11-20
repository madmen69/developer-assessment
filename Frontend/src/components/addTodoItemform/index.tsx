import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { todoItemCreate } from '../../store/todoItems/slice'
import { errorMessageSelector } from '../../store/todoItems/selectors'

import { Form, Button, Container, Row, Col, Stack, Spinner } from 'react-bootstrap'

import './index.scss'

export const AddTodoItemForm = () => {
    const dispatch = useDispatch()
    const errorMessage = useSelector(errorMessageSelector)

    const [value, setValue] = useState('')
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    const handleClear = (event) => {
        setValue('')
    }

    const handleFormSubmit = () => {
        dispatch(todoItemCreate(value))
    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 8 }} lg={{ span: 6 }}>
                    <Form>
                        <h1>Add Item</h1>
                        <Form.Group className="mb-3" controlId="formAddItem">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                value={value}
                                onChange={handleChange}
                                type="input"
                                placeholder="Enter description..."
                            />
                            <Form.Text className={errorMessage && 'error'}>
                                {!errorMessage ? 'Complete the todo item form with description' : errorMessage}
                            </Form.Text>
                        </Form.Group>
                        <Stack direction="horizontal" gap={2}>
                            <Button onClick={handleFormSubmit} variant="primary" type="button">
                                Add item
                            </Button>
                            <Button onClick={handleClear} variant="secondary" type="button">
                                Clear
                            </Button>
                        </Stack>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AddTodoItemForm

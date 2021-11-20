import React from 'react'
import { Container, Row, Col, Table, Button, Stack } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { TodoItem } from '../../store/todoItems/entities'
import { todoItemsSelector } from '../../store/todoItems/selectors'
import { todoItemUpdate } from '../../store/todoItems/slice'

import './index.scss'

export const TodoItemLists = () => {
    const dispatch = useDispatch()
    const allTodoItems = useSelector(todoItemsSelector.selectAll)
    const count = allTodoItems.length
    const heading = `Showing ${count} item${count > 1 ? 's' : ''}`

    return (
        <Container className="marginSpacing">
            <Row>
                <Col>
                    <Stack direction="horizontal" gap={3}>
                        <h1>{heading}</h1>
                        <Button variant="primary" type="button">
                            Refresh
                        </Button>
                    </Stack>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTodoItems.map((item: TodoItem) => (
                                <tr key={item.todoItemId}>
                                    <td>{item.todoItemId}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <Button
                                            disabled={item.isCompleted}
                                            variant="success"
                                            size="sm"
                                            onClick={() => dispatch(todoItemUpdate(item))}
                                        >
                                            Mark as completed
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default TodoItemLists

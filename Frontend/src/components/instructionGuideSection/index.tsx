import React from 'react'
import { Alert, Container, Row, Col } from 'react-bootstrap'

const instructions = [
    'Add the ability to add (POST) a Todo Item by calling the backend API',
    `Display (GET) all the current Todo Items in the below grid and display them in any order
you wish`,
    `Bonus points for completing the 'Mark as completed' button code for allowing users to
update and mark a specific Todo Item as completed and for displaying any relevant
validation errors/ messages from the API in the UI`,
    `Feel free to add unit tests and refactor the component(s) as best you see fit`,
]
export const InstructionGuideSection = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Alert variant="success">
                        <Alert.Heading>Todo List App</Alert.Heading>
                        <p>
                            Welcome to the ClearPoint frontend technical test. We like to keep things simple, yet clean
                            so your task(s) are as follows:
                        </p>
                        <ol className="list-left">
                            {instructions.map((ins, index) => (
                                <li key={index}>{ins}</li>
                            ))}
                        </ol>
                    </Alert>
                </Col>
            </Row>
        </Container>
    )
}

export default InstructionGuideSection

import React from 'react'
import { Navbar, Container } from 'react-bootstrap'

import './index.scss'

export const BrandHeader = () => {
    return (
        <Navbar className="navBar">
            <Container className="navBarContainer">
                <Navbar.Brand href="#">
                    <img src="/clearPointLogo.png" className="icon" alt="Clearpoint brand logo" />
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default BrandHeader

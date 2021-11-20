import React from 'react'
import { Navbar, Container } from 'react-bootstrap'

import './index.scss'

export const Footer = () => {
    return (
        <footer className="footer">
            <div>
                © 2021 Copyright:
                <a className="link" href="https://clearpoint.digital" target="_blank" rel="noreferrer">
                    clearpoint.digital
                </a>
            </div>
        </footer>
    )
}

export default Footer

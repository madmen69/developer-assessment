import React from 'react'
import { Footer } from './index'
import { render, screen } from '@testing-library/react'

describe('Footer', () => {
    it('should render without crashing', async () => {
        render(<Footer />)

        expect(screen.getByText(/clearpoint.digital/)).toHaveAttribute('href', 'https://clearpoint.digital')
    })
})

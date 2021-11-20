import React from 'react'
import { BrandHeader } from './index'
import { render, screen } from '@testing-library/react'

describe('Brand header', () => {
    it('should render without crashing', async () => {
        render(<BrandHeader />)
        expect(screen.getByAltText(/Clearpoint brand logo/)).toBeInTheDocument()
    })
})

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Integrations from '../components/Integrations'

describe('Integrations', () => {
  it('renders integration cards', () => {
    render(<Integrations />)
    
    expect(screen.getByText(/500.*integrations/i)).toBeInTheDocument()
  })

  it('displays search input', () => {
    render(<Integrations />)
    
    const searchInput = screen.getByPlaceholderText(/search integrations/i)
    expect(searchInput).toBeInTheDocument()
  })

  it('renders category filter buttons', () => {
    render(<Integrations />)
    
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Dev Tools')).toBeInTheDocument()
    expect(screen.getByText('Communication')).toBeInTheDocument()
  })

  it('filters integrations by category', () => {
    render(<Integrations />)
    
    const devToolsButton = screen.getByText('Dev Tools')
    expect(devToolsButton).toBeInTheDocument()
  })

  it('shows status badges', () => {
    render(<Integrations />)
    
    expect(screen.getByText(/ready/i)).toBeInTheDocument()
    expect(screen.getByText(/beta/i)).toBeInTheDocument()
  })

  it('provides request integration button', () => {
    render(<Integrations />)
    
    const requestButton = screen.getByText(/request integration/i)
    expect(requestButton).toBeInTheDocument()
  })
})

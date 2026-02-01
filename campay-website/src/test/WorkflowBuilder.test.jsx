import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WorkflowBuilder from '../components/WorkflowBuilder'

describe('WorkflowBuilder', () => {
  it('renders initial workflow nodes', () => {
    render(<WorkflowBuilder onWorkflowChange={() => {}} />)
    
    expect(screen.getByText('Webhook')).toBeInTheDocument()
    expect(screen.getByText('Validate')).toBeInTheDocument()
    expect(screen.getByText('Transform')).toBeInTheDocument()
    expect(screen.getByText('Notify')).toBeInTheDocument()
  })

  it('allows adding new nodes', async () => {
    const onWorkflowChange = vi.fn()
    render(<WorkflowBuilder onWorkflowChange={onWorkflowChange} />)
    
    const addButton = screen.getByRole('button', { name: /webhook/i })
    await userEvent.click(addButton)
    
    expect(onWorkflowChange).toHaveBeenCalled()
  })

  it('displays workflow statistics', () => {
    render(<WorkflowBuilder onWorkflowChange={() => {}} />)
    
    expect(screen.getByText(/nodes/i)).toBeInTheDocument()
    expect(screen.getByText(/connections/i)).toBeInTheDocument()
    expect(screen.getByText(/complexity/i)).toBeInTheDocument()
  })

  it('provides copy code functionality', () => {
    render(<WorkflowBuilder onWorkflowChange={() => {}} />)
    
    const copyButton = screen.getByRole('button', { name: /copy/i })
    expect(copyButton).toBeInTheDocument()
  })
})

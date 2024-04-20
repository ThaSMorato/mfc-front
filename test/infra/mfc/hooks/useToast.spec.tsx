import { act, render, screen } from '@testing-library/react'
import React from 'react'

import { ToastContextProvider, useToast } from '@/infra/mfc/hooks/useToast'

interface SuccessToast {
  shouldOpen: boolean
  message: string
  onClose: () => void
}

vitest.mock('../../../../src/infra/ui/common/components/success-toast', () => ({
  SuccessToast: (props: SuccessToast) => (
    <>
      {props.shouldOpen ? <p>{props.message}</p> : <p>Closed</p>}
      {props.shouldOpen && <button onClick={props.onClose}>Close</button>}
    </>
  ),
}))

const TestComponent = () => {
  const { showToast } = useToast()

  return (
    <>
      <button onClick={() => showToast('a message')}>Show toast</button>
    </>
  )
}

const sut = () => {
  render(
    <ToastContextProvider>
      <TestComponent />
    </ToastContextProvider>,
  )
}

describe('Use Toast Hook', () => {
  it('Should show the toast element on function call with the message', async () => {
    sut()

    const showButton = screen.getByText('Show toast')
    const closedText = screen.getByText('Closed')

    expect(showButton).toBeInTheDocument()
    expect(closedText).toBeInTheDocument()

    act(() => {
      showButton.click()
    })

    const openedText = screen.getByText('a message')
    const closeButton = screen.getByText('Close')

    expect(openedText).toBeInTheDocument()
    expect(closeButton).toBeInTheDocument()

    act(() => {
      closeButton.click()
    })

    expect(closedText).toBeInTheDocument()
  })
})

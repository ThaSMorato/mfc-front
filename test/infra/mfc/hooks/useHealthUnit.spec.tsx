import { act, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { right } from '@/core/either'
import {
  HealthUnitContextProvider,
  useHealthUnit,
} from '@/infra/mfc/hooks/useHealthUnit'
import { FetchAllHealthUnitsUseCase } from '@/mfc/application/use-cases/fetch-all-health-units'
import { makeHealthUnit } from '$/repositories/factories/make-health-unit'

const mockExecute = vitest.spyOn(
  FetchAllHealthUnitsUseCase.prototype,
  'execute',
)

const TestComponent = () => {
  const {
    fetchAllHealthUnits: {
      fetchAllHealthUnitsFunction,
      healthUnits,
      isLoading,
    },
  } = useHealthUnit()

  return (
    <>
      <button onClick={() => fetchAllHealthUnitsFunction()}>Fetch</button>
      {!healthUnits || isLoading ? (
        <p>Loading</p>
      ) : (
        <p>{healthUnits[0].name}</p>
      )}
    </>
  )
}

const sut = () => {
  render(
    <HealthUnitContextProvider>
      <TestComponent />
    </HealthUnitContextProvider>,
  )
}

describe('Use Health Units Hook', () => {
  it('Should start with no healthUnits and on fn call update the state', async () => {
    mockExecute.mockResolvedValue(
      right({
        healthUnits: [
          makeHealthUnit({
            name: 'Test Health Unit',
          }),
        ],
      }),
    )
    sut()

    const fetchButton = screen.getByText('Fetch')
    const loadingState = screen.getByText('Loading')

    expect(fetchButton).toBeInTheDocument()
    expect(loadingState).toBeInTheDocument()

    act(() => {
      fetchButton.click()
    })

    expect(mockExecute).toBeCalled()

    await waitFor(() => {
      expect(screen.getByText('Test Health Unit')).toBeInTheDocument()
    })
  })
})

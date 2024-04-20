import { act, render, screen } from '@testing-library/react'
import React from 'react'

import { right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  NurseShiftContextProvider,
  useNurseShift,
} from '@/infra/mfc/hooks/useNurseShift'
import { ApplyToShiftUseCase } from '@/mfc/application/use-cases/apply-to-shift'
import { NurseShift } from '@/mfc/domain/entities/nurse-shift'

const mockExecute = vitest.spyOn(ApplyToShiftUseCase.prototype, 'execute')

const TestComponent = () => {
  const {
    applyToShift: { applyToShiftFucntion },
  } = useNurseShift()

  return (
    <>
      <button onClick={() => applyToShiftFucntion('a-shift-id')}>Apply</button>
    </>
  )
}

const sut = () => {
  render(
    <NurseShiftContextProvider>
      <TestComponent />
    </NurseShiftContextProvider>,
  )
}

describe('Use Nurse Shift Hook', () => {
  it('Should call the apply to shift on function call', async () => {
    mockExecute.mockResolvedValue(
      right({
        nurseShift: NurseShift.create({
          shiftId: new UniqueEntityID('a-shift-id'),
        }),
      }),
    )

    sut()

    const applyButton = screen.getByText('Apply')

    expect(applyButton).toBeInTheDocument()

    act(() => {
      applyButton.click()
    })

    expect(mockExecute).toBeCalledTimes(1)
  })
})

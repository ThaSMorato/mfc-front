import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface NurseShiftProps {
  nurseId?: UniqueEntityID
  shiftId: UniqueEntityID
  approved?: boolean | null
  createdAt: Date
  updatedAt?: Date | null
}

export class NurseShift extends Entity<NurseShiftProps> {
  static create(
    props: Optional<NurseShiftProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const nurseShift = new NurseShift(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return nurseShift
  }

  get nurseId() {
    return this.props.nurseId
  }

  get shiftId() {
    return this.props.shiftId
  }

  get approved() {
    return this.props.approved
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  approve() {
    this.props.approved = true
    this.touch()
  }

  disaprove() {
    this.props.approved = false
    this.touch()
  }

  get isApproved() {
    return this.updatedAt && this.approved
  }
}

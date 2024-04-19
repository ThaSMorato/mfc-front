import { faker } from '@faker-js/faker'

interface NurseProps {
  email: string
  password: string
}

export function makeNurse(override: Partial<NurseProps> = {}) {
  const nurse = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...override,
  }

  return nurse
}

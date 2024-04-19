import { Env, envSchema } from './env'

class EnvServiceClass {
  private env: Env

  constructor() {
    try {
      this.env = envSchema.parse(import.meta.env)
    } catch (err) {
      console.error('Falha na validação .env:', err)
      process.exit(1)
    }
  }

  get<Key extends keyof Env>(key: Key) {
    return this.env[key]
  }
}

export const EnvService = new EnvServiceClass()

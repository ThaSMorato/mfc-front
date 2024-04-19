import { z } from 'zod'

export const envSchema = z.object({
  VITE_APP_API_URL: z.string().url(),
  VITE_APP_STORAGE_FLAG: z.string(),
})

export type Env = z.infer<typeof envSchema>

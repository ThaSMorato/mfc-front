export interface NursesRepository {
  authenticate(email: string, password: string): Promise<string | null>
}

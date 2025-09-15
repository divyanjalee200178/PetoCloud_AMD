export interface PetProfile {
  id?: string
  petName: string
  age: number
  gender: "Male" | "Female" | "Other"
  weight: number
  species: string
  breed: string
  birthday: string
  userId?: string
}

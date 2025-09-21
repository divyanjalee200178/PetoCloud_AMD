export interface PetProfile {
  id?: string
  petName: string
  age: number
  gender: "Male" | "Female" | "Other"
  weight: string
  species: string
  breed: string
  birthday: string
  userId?: string
  imageUri?: string // <-- new field
}

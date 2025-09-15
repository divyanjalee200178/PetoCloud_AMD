import { PetProfile } from "@/types/pet"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"

export const petsRef = collection(db, "pets")

export const getAllPets = async (): Promise<PetProfile[]> => {
  const snapshot = await getDocs(petsRef)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PetProfile))
}

export const getPetById = async (id: string): Promise<PetProfile | null> => {
  const docRef = doc(db, "pets", id)
  const snapshot = await getDoc(docRef)
  return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as PetProfile) : null
}

export const createPet = async (pet: PetProfile) => {
  const docRef = await addDoc(petsRef, pet)
  return docRef.id
}

export const updatePet = async (id: string, pet: PetProfile) => {
  const { id: _id, ...data } = pet
  const docRef = doc(db, "pets", id)
  return updateDoc(docRef, data)
}

export const deletePet = async (id: string) => {
  const docRef = doc(db, "pets", id)
  return deleteDoc(docRef)
}

export const getPetsByUserId = async (userId: string): Promise<PetProfile[]> => {
  const q = query(petsRef, where("userId", "==", userId))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PetProfile))
}

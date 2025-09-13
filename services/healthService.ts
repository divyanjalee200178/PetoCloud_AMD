import { Health } from "@/types/health"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc, where, query } from "firebase/firestore"
import { db } from "@/firebase"

export const healthRef = collection(db, "health")

export const createHealth = async (health: Health) => {
  const docRef = await addDoc(healthRef, health)
  return docRef.id
}

export const updateHealth = async (id: string, health: Health) => {
  const healthDocRef = doc(db, "health", id)
  const { id: _id, ...healthData } = health
  return updateDoc(healthDocRef, healthData)
}

export const deleteHealth = async (id: string) => {
  const healthDocRef = doc(db, "health", id)
  return deleteDoc(healthDocRef)
}

export const getAllHealthByUserId = async (userId: string): Promise<Health[]> => {
  const q = query(healthRef, where("userId", "==", userId))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((docRef) => ({
    id: docRef.id,
    ...docRef.data(),
  })) as Health[]
}

export const getHealthById = async (id: string) => {
  const healthDocRef = doc(db, "health", id)
  const snapshot = await getDoc(healthDocRef)
  return snapshot.exists()
    ? ({ id: snapshot.id, ...snapshot.data() } as Health)
    : null
}

export const getAllHealth = async (): Promise<Health[]> => {
  const snapshot = await getDocs(healthRef)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Health[]
}

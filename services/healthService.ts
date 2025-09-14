import { HealthRecord } from "@/types/health"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"

export const healthRef = collection(db, "health")

export const getAllHealth = async (): Promise<HealthRecord[]> => {
  const snapshot = await getDocs(healthRef)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HealthRecord))
}

export const getHealthById = async (id: string): Promise<HealthRecord | null> => {
  const docRef = doc(db, "health", id)
  const snapshot = await getDoc(docRef)
  return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as HealthRecord) : null
}

export const createHealth = async (record: HealthRecord) => {
  const docRef = await addDoc(healthRef, record)
  return docRef.id
}

export const updateHealth = async (id: string, record: HealthRecord) => {
  const { id: _id, ...data } = record
  const docRef = doc(db, "health", id)
  return updateDoc(docRef, data)
}

export const deleteHealth = async (id: string) => {
  const docRef = doc(db, "health", id)
  return deleteDoc(docRef)
}

export const getHealthByUserId = async (userId: string): Promise<HealthRecord[]> => {
  const q = query(healthRef, where("userId", "==", userId))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HealthRecord))
}

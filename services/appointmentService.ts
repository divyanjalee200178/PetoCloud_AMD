import { Appointment } from "@/types/appointment"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"

export const appointmentRef = collection(db, "appointments")

export const getAllAppointments = async (): Promise<Appointment[]> => {
  const snapshot = await getDocs(appointmentRef)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment))
}

export const getAppointmentById = async (id: string): Promise<Appointment | null> => {
  const docRef = doc(db, "appointments", id)
  const snapshot = await getDoc(docRef)
  return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as Appointment) : null
}

export const createAppointment = async (appointment: Appointment) => {
  const docRef = await addDoc(appointmentRef, appointment)
  return docRef.id
}

export const updateAppointment = async (id: string, appointment: Appointment) => {
  const { id: _id, ...data } = appointment
  const docRef = doc(db, "appointments", id)
  return updateDoc(docRef, data)
}

export const deleteAppointment = async (id: string) => {
  const docRef = doc(db, "appointments", id)
  return deleteDoc(docRef)
}

export const getAppointmentsByUserId = async (userId: string): Promise<Appointment[]> => {
  const q = query(appointmentRef, where("userId", "==", userId))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment))
}

import { Stack } from "expo-router"
import React from "react"

const AppointmentLayout = () => {
  return (
   <Stack screenOptions={{ animation: "slide_from_right" }} >
     <Stack.Screen name="index" options={{ headerShown: false }} />
     <Stack.Screen name="new" options={{ title: "Add Appointment" }} />
     <Stack.Screen name="edit" options={{ title: "Edit Appointment" }} />
   </Stack>

  )
}

export default AppointmentLayout

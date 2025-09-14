import { Stack } from "expo-router"
import React from "react"

const HealthLayout = () => {
  return (
    <Stack screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="new" options={{ title: "Add Health Record" }} />

      <Stack.Screen name="edit" options={{ title: "Edit Health Record" }} />
    </Stack>
  )
}

export default HealthLayout

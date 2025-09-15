import { Stack } from "expo-router";
import React from "react";

const ProfileLayout = () => {
  return (
    <Stack screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen name="index" options={{ title: "My Pets" }} />
      <Stack.Screen name="petData" options={{ title: "Add Pet" }} />
      <Stack.Screen name="edit" options={{ title: "Edit Pet" }} />
    </Stack>
  );
};

export default ProfileLayout;

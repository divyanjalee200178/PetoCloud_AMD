import React from "react";
import "./../global.css";
import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default RootLayout;

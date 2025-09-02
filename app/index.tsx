import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) return alert("Enter email & password");
    setLoading(true);
    setTimeout(() => setLoading(false), 1000); // simulate login
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 20 }}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 10, borderRadius: 5 }}
      />
      <TouchableOpacity
        onPress={handleLogin}
        style={{ backgroundColor: "blue", padding: 15, borderRadius: 5 }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", textAlign: "center" }}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Login;

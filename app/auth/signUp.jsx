// For Creating a new account
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Colors from "./../../constant/Colors";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../config/firebase";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created successfully!");
      router.push("/home"); // Navigate to home after successful registration
    } catch (error) {
      console.error("Registration error:", error.message);
      Alert.alert("Error", error.message);
    } finally {
      setTimeout(() => setIsLoading(false), 4000); // Simulate loading for 4 seconds
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 25,
        backgroundColor: Colors.PRIMARY,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.BLUE} />
      ) : (
        <>
          <Text
            style={{
              color: Colors.BLUE,
              fontSize: 28,
              fontFamily: "outfit-bold",
              marginBottom: 20,
              textAlign: "center",
              fontWeight: "900",
            }}
          >
            Register
          </Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={Colors.BLUE}
            keyboardType="email-address"
            style={styles.textInput}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={Colors.BLUE}
            secureTextEntry
            style={styles.textInput}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <Text style={{ color: Colors.WHITE }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("auth/signIn")}>
              <Text style={{ color: Colors.BLUE }}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: "100%",
    padding: 12,
    fontSize: 16,
    marginTop: 16,
    borderRadius: 8,
    borderColor: Colors.BLUE,
    color: Colors.BLUE,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    textAlign: "center",
  },
  button: {
    padding: 12,
    backgroundColor: Colors.BLUE,
    width: "100%",
    marginTop: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: "outfit",
    fontSize: 16,
    color: Colors.PRIMARY,
    textAlign: "center",
  },
});

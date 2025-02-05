// For Logging in to already created account
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import Colors from "./../../constant/Colors";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function SignIn() {
  const router = useRouter();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
    translateY.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.ease),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully!");
      router.replace("/home");
    } catch (error) {
      console.error("Error signing in:", error.message);
      Alert.alert("Error", error.message);
    } finally {
      setTimeout(() => setIsLoading(false), 4000); // Simulate loading for 4 seconds
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.BLUE} />
      ) : (
        <>
          <Animated.Image
            source={require("../../assets/images/logo.jpeg")}
            style={[styles.logo, animatedStyle]}
          />

          <Animated.Text style={[styles.title, animatedStyle]}>
            Welcome Back
          </Animated.Text>

          <Animated.View style={[animatedStyle, styles.inputContainer]}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor={Colors.BLUE}
              style={[styles.textInput, { transform: [{ scale: 1 }], textAlign: "left" }]}
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={Colors.BLUE}
              style={[styles.textInput, { transform: [{ scale: 1 }], textAlign: "left" }]}
            />
          </Animated.View>

          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push("auth/signUp")}>
              <Text style={{ color: Colors.BLUE }}>Create New Here</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.PRIMARY,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  title: {
    color: Colors.BLUE,
    fontSize: 26,
    fontFamily: "outfit-bold",
    marginBottom: 20,
    fontWeight: "900",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    width: "100%",
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    borderRadius: 8,
    borderColor: Colors.BLUE,
    color: Colors.BLUE,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    textAlign: "center",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: Colors.BLUE,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: "outfit",
    fontSize: 18,
    color: Colors.PRIMARY,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    color: Colors.WHITE,
    marginRight: 5,
  },
  footerLink: {
    color: Colors.LIGHT_BLUE,
    textDecorationLine: "underline",
  },
});

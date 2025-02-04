// For Creating a new account
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Colors from "./../../constant/Colors";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function SignUp() {
  const router = useRouter();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

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

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      // Basic validation
      if (!email || !password || !name) {
        throw new Error('Please fill in all required fields');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update only the displayName
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      if (userCredential.user.uid) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          fullName: name,
          email: email,
          createdAt: new Date().toISOString()
        });
      }
      
      console.log("User created successfully!");
      router.push("/home");
    } catch (error) {
      console.error("Registration error:", error);
      // More specific error messages
      let errorMessage = "An error occurred during registration";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already registered";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password should be at least 6 characters";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Please enter a valid email address";
      }
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false); // Remove timeout and update loading state immediately
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.BLUE} />
      ) : (
        <>
          <Animated.Image
            source={require("../../assets/images/logo.png")}
            style={[styles.logo, animatedStyle]}
          />
          
          <Animated.Text style={[styles.title, animatedStyle]}>
            Create Account
          </Animated.Text>

          <Animated.View style={[animatedStyle, styles.inputContainer]}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Full Name"
              placeholderTextColor={Colors.BLUE}
              style={styles.textInput}
            />
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
          </Animated.View>
          
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <Text style={{ color: Colors.WHITE }}>
              Already have an account?{" "}
            </Text>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.PRIMARY,
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
    marginTop: 16,
    borderRadius: 8,
    borderColor: Colors.BLUE,
    color: Colors.BLUE,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    textAlign: "left",
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
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    alignSelf: 'center',
  },
});

// For Creating a new account
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
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
  signInWithEmailAndPassword,
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [user, setUser] = useState(null);

  // Define the shared value for animation
  const animationValue = useSharedValue(0);

  // Define the animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(animationValue.value, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      }),
      transform: [
        {
          translateY: withTiming(animationValue.value * 10, {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    };
  });

  useEffect(() => {
    // Start the animation
    animationValue.value = 1;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        router.replace("/home");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log out
        await signOut(auth);
        console.log('User logged out successfully!');
      } else {
        // Sign up
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        const newUser = userCredential.user;

        // Update the user's profile with full name
        await updateProfile(newUser, {
          displayName: fullName,
        });

        // Store additional user data in Firestore
        await setDoc(doc(db, 'users', newUser.uid), {
          fullName: fullName,
          email: email.trim(),
          createdAt: new Date().toISOString(),
          uid: newUser.uid
        });

        console.log('User created successfully!');
        // No need to manually navigate; onAuthStateChanged will handle it
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/images/logo.jpeg")}
        style={[styles.logo, animatedStyle]}
      />
      

      <Animated.Text style={[styles.title, animatedStyle]}>
        Create Account
      </Animated.Text>

      <Animated.View style={[animatedStyle, styles.inputContainer]}>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
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
      
      <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.signInContainer}>
        <Text style={{ color: Colors.WHITE }}>
          Already have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => router.push("auth/signIn")}>
          <Text style={{ color: Colors.BLUE }}>Sign In</Text>
        </TouchableOpacity>
      </View>
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
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
});

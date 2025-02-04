import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import Colors from "./../../constant/Colors";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function SignUp() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSignUp = async () => {
    if (!fullName || !phoneNumber || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Create user in Firebase Authentication using actual email
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user information in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        phoneNumber,
        email,
        createdAt: new Date(),
      });

      // Navigate to home screen
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
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
      <Animated.View
        style={{
          opacity: fadeAnim,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/logo.png")}
          style={{
            width: 200,
            height: 200,
            marginBottom: 30,
          }}
        />
      </Animated.View>

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          width: "100%",
          alignItems: "center",
        }}
      >
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
          Create Account
        </Text>

        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
            placeholderTextColor={Colors.BLUE}
            style={[styles.textInput, { transform: [{ scale: 1 }], textAlign: "left" }]}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={Colors.BLUE}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[styles.textInput, { transform: [{ scale: 1 }], textAlign: "left" }]}
          />
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Phone Number"
            placeholderTextColor={Colors.BLUE}
            keyboardType="phone-pad"
            style={[styles.textInput, { transform: [{ scale: 1 }], textAlign: "left" }]}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={Colors.BLUE}
            secureTextEntry={true}
            style={[styles.textInput, { transform: [{ scale: 1 }], textAlign: "left" }]}
          />

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <Text style={{ color: Colors.WHITE }}>Already have an account? </Text>
          <Pressable onPress={() => router.push("/auth/signIn")}>
            <Text style={{ color: Colors.BLUE }}>Sign In</Text>
          </Pressable>
        </View>
      </Animated.View>
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
  buttonDisabled: {
    backgroundColor: Colors.GRAY,
  },
});

import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import Colors from '../constant/Colors';
import { doc, getDoc } from 'firebase/firestore';

export default function Home() {
  const [userData, setUserData] = useState(() => {
    // Initialize with auth data immediately
    const user = auth.currentUser;
    return user ? {
      fullName: user.displayName,
      email: user.email
    } : null;
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        // Get Firestore data
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          setUserData({
            fullName: userDoc.data().fullName || user.displayName,
            email: userDoc.data().email || user.email
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // Already showing auth data, so no need for fallback
      }
    };

    loadUserData();
  }, []);

  // Early return with auth data while Firestore loads
  if (!userData) {
    const user = auth.currentUser;
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>
          Hello, {user?.displayName || 'User'}! 👋
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Hello, {userData.fullName}! 👋
      </Text>
      {userData.email && (
        <Text style={styles.emailText}>{userData.email}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: Colors.WHITE,
    fontFamily: 'outfit-bold',
    marginTop: 50,
  },
  emailText: {
    fontSize: 16,
    color: Colors.WHITE,
    fontFamily: 'outfit',
    marginTop: 20,
  }
}); 
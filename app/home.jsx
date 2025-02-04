import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import Colors from '../constant/Colors';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function Home() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          // Get additional user data from Firestore
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setUserData({
              fullName: currentUser.displayName,
              phoneNumber: userDoc.data().phoneNumber,
            });
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {userData?.fullName || 'Guest'}!</Text>
      {userData?.phoneNumber && (
        <Text style={styles.phoneNumber}>Phone: {userData.phoneNumber}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 24,
    color: Colors.BLUE,
    fontFamily: 'outfit-bold',
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 16,
    color: Colors.WHITE,
    fontFamily: 'outfit',
  },
}); 
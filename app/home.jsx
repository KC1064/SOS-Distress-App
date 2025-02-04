import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth } from '../config/firebase';
// import { getUser } from '../utils/database';
import Colors from '../constant/Colors';

export default function Home() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          // const userDetails = await getUser(currentUser.uid);
          // setUserData(userDetails);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {userData?.fullName}!</Text>
      <Text style={styles.phoneNumber}>Phone: {userData?.phoneNumber}</Text>
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
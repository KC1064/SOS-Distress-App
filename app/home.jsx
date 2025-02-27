import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../constant/Colors";
import SendSMS from 'react-native-sms';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  const handleLogout = () => {
    console.log("User logged out");
    navigation.navigate('Index');
  };

  const sendSMS = () => {
    SendSMS.send({
      body: 'This is a test message',
      recipients: ['8342829059'],
      successTypes: ['sent', 'queued'],
      allowAndroidSendWithoutReadPermission: true
    }, (completed, cancelled, error) => {
      if (completed) {
        console.log('SMS Sent Successfully');
      } else if (cancelled) {
        console.log('SMS Sending Cancelled');
      } else if (error) {
        console.log('Some error occurred');
      }
    });
    console.log('SMS send function executed');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.mainTitle}>MAYDAY SIGNAL</Text>
      <Text style={styles.subtitle}>Don't Panic, Keep Calm</Text>
      <Text style={styles.subtitle}>Help is on the way.</Text>
      
      <TouchableOpacity 
        style={styles.helpButton}
        activeOpacity={0.8}
        onPress={sendSMS}
      >
        <View style={styles.buttonInner}>
          <Text style={styles.helpButtonText}>HELP</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Status: Sending Signal....</Text>
      </View>

      <TextInput
        style={styles.messageInput}
        placeholder="Write any message......"
        placeholderTextColor={Colors.MINT_GREEN}
        multiline={true}
        numberOfLines={4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    alignItems: "center",
    padding: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'outfit-bold',
  },
  mainTitle: {
    fontSize: 32,
    color: '#7FFFD4', // Mint green color
    fontFamily: "outfit-bold",
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#7FFFD4',
    fontFamily: "outfit",
    textAlign: 'center',
  },
  helpButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginVertical: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonInner: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF5147',
    shadowColor: "#FF0000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  helpButtonText: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'outfit-bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  statusContainer: {
    backgroundColor: '#7FFFD440',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginBottom: 20,
    width: '100%',
  },
  statusText: {
    color: '#7FFFD4',
    fontSize: 16,
    fontFamily: 'outfit',
    textAlign: 'center',
  },
  messageInput: {
    width: '100%',
    height: 150,
    borderColor: '#7FFFD4',
    borderWidth: 2,
    borderRadius: 20,
    padding: 15,
    color: '#7FFFD4',
    fontFamily: "outfit",
    textAlignVertical: 'top',
  },
});

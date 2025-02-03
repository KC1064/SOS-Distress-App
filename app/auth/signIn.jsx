import { View, Text, Image, TextInput, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from "expo-router";
import Colors from './../../constant/Colors';

export default function SignIn() {
  const router = useRouter();
  return (
    <View style={{
      display: 'flex',
      alignItems: 'center',
      paddingTop: 100,
      flex: 1,
      padding: 25,
      backgroundColor: Colors.PRIMARY
    }}>
      <Image source={require('../../assets/images/logo.png')}
        style={{
          width: 180,
          height: 180
        }}
      />

      <Text style={{
        color: Colors.BLUE,
        fontSize: 30,
        fontFamily: 'outfit-bold'
      }}>Welcome Back</Text>

      <TextInput placeholder='Email' placeholderTextColor={Colors.BLUE} style={styles.textInput} />
      <TextInput placeholder='Password' secureTextEntry={true} placeholderTextColor={Colors.BLUE} style={styles.textInput} />
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.BLUE,
          width: '100%',
          marginTop: 25,
          borderRadius: 10
        }}>
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 20,
          color: Colors.PRIMARY,
          textAlign: 'center'
        }}>Sign In</Text>
      </TouchableOpacity>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        marginTop: 20
      }}>
        <Text style={{ color: Colors.WHITE }}>Don't have an account?</Text>
        <Pressable onPress={() => router.push('auth/signUp')}>
          <Text style={{ color: Colors.BLUE }}>Create New Here</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: '100%',
    padding: 15,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 8,
    borderColor: Colors.BLUE,
    color: Colors.BLUE
  }
});

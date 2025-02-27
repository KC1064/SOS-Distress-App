import { Text, View, Image, StyleSheet, TouchableOpacity, Animated } from "react-native";
import Colors from '../constant/Colors';
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";

export default function Index() {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(400)).current; 

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.BLUE
      }}
    >
      <Image source={require('./../assets/images/landing.jpeg')}
        style={{
          width: '100%',
          height: 300,
          marginTop: 70
        }}
      />
      <Animated.View 
        style={[{
          padding: 25,
          backgroundColor: Colors.PRIMARY,
          height: '100%',
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          transform: [{ translateY: slideAnim }]
        }]}
      >
        <Text style={{
          fontSize: 25,
          fontWeight: 'bold',
          textAlign: 'center',
          color: Colors.BLUE
        }}>Your Lifeline in Times of Need</Text>
        <Text style={{
          fontSize: 15,
          textAlign: 'center',
          color: Colors.BLUE,
          marginTop: 20
        }}>We understand that emergencies can be overwhelming, but remember, you are not alone. Take a deep breath and know that help is just a tap away.</Text>
        <TouchableOpacity style={styles.button}
        onPress={()=>router.push('/auth/signUp')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>router.push('/auth/signIn')} style={[styles.button, {
          backgroundColor: Colors.PRIMARY,
          borderWidth: 1,
          borderColor: Colors.BLUE
        }]}>
          <Text style={[styles.buttonText, { color: Colors.BLUE }]}>Already have an Account</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Colors.BLUE,
    marginTop: 20,
    borderRadius: 10
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18
  }
});

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LandingScreen from "./screens/LandingScreen";
// import LoginScreen from "./screens/LoginScreen";
// import OTPScreen from "./screens/OTPScreen";
// import UserScreen from "./screens/UserScreen";
// import RescueCenterScreen from "./screens/RescueCenterScreen";
// import ProfileScreen from "./screens/ProfileScreen";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Landing">
//         <Stack.Screen
//           name="Landing"
//           component={LandingScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Login"
//           component={LoginScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen name="OTP" component={OTPScreen} />
//         <Stack.Screen name="User" component={UserScreen} />
//         <Stack.Screen name="RescueCenter" component={RescueCenterScreen} />
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

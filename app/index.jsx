import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from '../constant/Colors';
import { useRouter } from "expo-router";
export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.BLUE
      }}
    >
      <Image source={require('./../assets/images/landing.png')}
        style={{
          width: '100%',
          height: 300,
          marginTop: 70
        }}
      />
      <View style={{
        padding: 25,
        backgroundColor: Colors.PRIMARY,
        height: '100%',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35
      }}>
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
      </View>
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

import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../constant/Colors";

export default function Home() {
  return (
    <View style={beaconStyles.container}>
      <Text style={beaconStyles.topText}>Distress Beacon Activated</Text>
      <View style={beaconStyles.sosButtonContainer}>
        <Icon name="satellite-variant" size={100} color={Colors.WHITE} />
      </View>
      <TextInput
        style={beaconStyles.customTextBox}
        placeholder="Enter Mission ID or Emergency Status"
        placeholderTextColor={Colors.GRAY}
      />
    </View>
  );
}

const beaconStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LIGHT_BLUE,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  topText: {
    fontSize: 24,
    color: Colors.DARK_BLUE,
    fontFamily: "outfit-bold",
    marginBottom: 20,
    marginTop: 20,
  },
  sosButtonContainer: {
    marginVertical: 40,
  },
  customTextBox: {
    width: "80%",
    height: 50,
    borderColor: Colors.WHITE,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: Colors.WHITE,
    fontFamily: "outfit",
    marginTop: 20,
  },
});

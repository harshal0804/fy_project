import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("credentials");
  const navigation = useNavigation(); // Initialize navigation

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.248.68:5000/login", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", response.data.token);
      const role = response.data.role; // Get the role from the response
      if (role === 'customer') {
        navigation.navigate('CustomerHome');
      } else if (role === 'supplier') {
        navigation.navigate('SupplierHome');
      }
    } catch (error) {
      alert("Login failed!");
    }
  };

  const navigateToQRCode = () => {
    navigation.navigate("QR"); // Navigate to the QR scanner screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MediChain</Text>
      <Text style={styles.subtitle}>Please sign in to continue</Text>

      {/* Tabs for Login and QR Code */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, tab === "credentials" && styles.activeTab]}
          onPress={() => setTab("credentials")}
        >
          <Text style={tab === "credentials" ? styles.activeTabText : styles.tabText}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, tab === "qr" && styles.activeTab]}
          onPress={() => {
            setTab("qr");
            navigateToQRCode(); // Navigate to QR Scanner screen
          }}
        >
          <Text style={tab === "qr" ? styles.activeTabText : styles.tabText}>
            QR Code
          </Text>
        </TouchableOpacity>
      </View>

      {/* Login Form - Displayed when the "Login" tab is active */}
      {tab === "credentials" && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#a6a6a6"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#a6a6a6"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>or</Text>
            <View style={styles.separatorLine} />
          </View>
          <TouchableOpacity style={styles.googleButton}>
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.signUpLink}>Create one</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Placeholder for QR Code - Displayed when the "QR Code" tab is active */}
      {tab === "qr" && (
        <View style={styles.qrContainer}>
          <Text style={styles.qrPlaceholder}>
            QR Scanner screen is loading...
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#1a1a1a", 
    padding: 20, 
    justifyContent: "center" 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    textAlign: "center", 
    color: "#ffffff" 
  },
  subtitle: { 
    fontSize: 16, 
    textAlign: "center", 
    color: "#a6a6a6", 
    marginVertical: 10 
  },
  tabsContainer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    marginBottom: 20 
  },
  tabButton: { 
    flex: 1, 
    padding: 10, 
    alignItems: "center", 
    borderBottomWidth: 2, 
    borderColor: "#2b2b2b" 
  },
  activeTab: { 
    borderColor: "#FF8553" 
  },
  tabText: { 
    color: "#a6a6a6", 
    fontSize: 16 
  },
  activeTabText: { 
    color: "#FF8553", 
    fontWeight: "bold" 
  },
  input: { 
    borderWidth: 1, 
    borderColor: "#d1d5db", 
    padding: 10, 
    borderRadius: 5, 
    marginBottom: 10, 
    backgroundColor: "#ffffff", 
    color: "#000000" 
  },
  loginButton: { 
    backgroundColor: "#FF8553", 
    padding: 15, 
    borderRadius: 5, 
    alignItems: "center", 
    marginVertical: 5 
  },
  googleButton: { 
    backgroundColor: "#4285F4", 
    padding: 15, 
    borderRadius: 5, 
    alignItems: "center", 
    marginVertical: 5 
  },
  buttonText: { 
    color: "#ffffff", 
    fontWeight: "bold" 
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#a6a6a6",
  },
  separatorText: {
    marginHorizontal: 10,
    color: "#a6a6a6",
  },
  signUpContainer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    marginTop: 10 
  },
  signUpText: { 
    color: "#a6a6a6" 
  },
  signUpLink: { 
    color: "#FF8553", 
    marginLeft: 5 
  },
  qrContainer: { 
    alignItems: "center", 
    justifyContent: "center", 
    paddingTop: 20 
  },
  qrPlaceholder: { 
    textAlign: "center", 
    fontSize: 16, 
    color: "#a6a6a6" 
  },
});
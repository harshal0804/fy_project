import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [otpSent, setOTPSent] = useState(false);
  const [mode, setMode] = useState("customer");
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await axios.post("http://192.168.248.68:5000/signup", {
        email,
        username,
        password,
        mode,
        phone,
      });
      sendOTP();
    } catch (error) {
      alert("Sign up failed!");
    }
  };

  const sendOTP = async () => {
    try {
      await axios.post("http://192.168.248.68:5000/send-otp", { email });
      setOTPSent(true);
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Failed to send OTP:", error.response ? error.response.data : error.message);
      alert("Failed to send OTP: " + (error.response ? error.response.data : error.message));
    }
  };

  const handleVerifyOTP = async () => {
    const otpCode = otp.join('');
    try {
      const response = await axios.post("http://192.168.248.68:5000/verify-otp", { email, otp: otpCode });
      if (response.data.success) {
        alert("OTP verified successfully!");
        const role = mode; // Use the mode as the role
        if (role === 'customer') {
          navigation.navigate('CustomerHome');
        } else if (role === 'supplier') {
          navigation.navigate('SupplierHome');
        }
      } else {
        alert("Invalid OTP!");
      }
    } catch (error) {
      console.error("Failed to verify OTP:", error.response ? error.response.data : error.message);
      alert("Failed to verify OTP: " + (error.response ? error.response.data : error.message));
    }
  };

  const handleOTPChange = (text, index) => {
    const newOTP = [...otp];
    newOTP[index] = text;
    setOTP(newOTP);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#a6a6a6"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#a6a6a6"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#a6a6a6"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#a6a6a6"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#a6a6a6"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <View style={styles.modeContainer}>
        <TouchableOpacity
          style={[styles.modeButton, mode === "supplier" && styles.activeMode]}
          onPress={() => setMode("supplier")}
        >
          <Text style={mode === "supplier" ? styles.activeModeText : styles.modeText}>Supplier</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, mode === "customer" && styles.activeMode]}
          onPress={() => setMode("customer")}
        >
          <Text style={mode === "customer" ? styles.activeModeText : styles.modeText}>Customer</Text>
        </TouchableOpacity>
      </View>

      {!otpSent ? (
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Text style={styles.title}>Enter OTP</Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                value={digit}
                onChangeText={(text) => handleOTPChange(text, index)}
                keyboardType="numeric"
                maxLength={1}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
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
  input: { 
    borderWidth: 1, 
    borderColor: "#d1d5db", 
    padding: 10, 
    borderRadius: 5, 
    marginBottom: 10, 
    backgroundColor: "#ffffff", 
    color: "#000000" 
  },
  modeContainer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    marginBottom: 20 
  },
  modeButton: { 
    flex: 1, 
    padding: 10, 
    alignItems: "center", 
    backgroundColor: "#2b2b2b", 
    marginHorizontal: 5, 
    borderRadius: 5 
  },
  activeMode: { 
    backgroundColor: "#FF8553" 
  },
  modeText: { 
    color: "#a6a6a6" 
  },
  activeModeText: { 
    color: "#ffffff" 
  },
  signUpButton: { 
    backgroundColor: "#FF8553", 
    padding: 15, 
    borderRadius: 5, 
    alignItems: "center", 
    marginVertical: 5 
  },
  verifyButton: { 
    backgroundColor: "#4ade80", 
    padding: 15, 
    borderRadius: 5, 
    alignItems: "center", 
    marginVertical: 5 
  },
  buttonText: { 
    color: "#ffffff", 
    fontWeight: "bold" 
  },
  otpContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20 
  },
  otpInput: { 
    borderWidth: 1, 
    borderColor: "#d1d5db", 
    padding: 10, 
    borderRadius: 5, 
    backgroundColor: "#ffffff", 
    textAlign: 'center', 
    fontSize: 18, 
    width: 40 
  },
});
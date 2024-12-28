import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const SupplierHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Supplier Dashboard</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Stock</Text>
        <Text style={styles.cardValue}>120</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pending Shipments</Text>
        <Text style={styles.cardValue}>5</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Completed Shipments</Text>
        <Text style={styles.cardValue}>115</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb", padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", color: "#1f2937", marginBottom: 20 },
  card: { backgroundColor: "#ffffff", padding: 20, borderRadius: 10, marginBottom: 20, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#1f2937" },
  cardValue: { fontSize: 24, fontWeight: "bold", color: "#2563eb", marginTop: 10 },
});

export default SupplierHomeScreen;
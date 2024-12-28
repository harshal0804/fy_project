import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const OrderDetailsPage = ({ route, navigation }) => {
  const { order } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainCard}>
          <Image source={{ uri: "https://img.icons8.com/ios-filled/50/ffffff/box.png" }} style={styles.boxImage} />
          <Text style={styles.mainCardText}>Order ID: {order.id}</Text>
          <Text style={styles.mainCardText}>Status: {order.status}</Text>
          <Text style={styles.mainCardText}>From: {order.from}</Text>
          <Text style={styles.mainCardText}>To: {order.to}</Text>
          <Text style={styles.mainCardText}>Weight: {order.weight}</Text>
          <Text style={styles.mainCardText}>Date: {order.date}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailTitle}>Shipping Details</Text>
          <Text style={styles.detailText}>Carrier: XYZ Logistics</Text>
          <Text style={styles.detailText}>Estimated Delivery: 2023-10-05</Text>
          <Text style={styles.detailText}>Tracking Number: 1234567890</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Order Status</Text>
          <View style={styles.statusTimeline}>
            <View style={styles.statusItem}>
              <Ionicons name="checkmark-circle-outline" size={20} color="green" />
              <Text style={styles.statusText}>Order Placed</Text>
            </View>
            <View style={styles.statusLine} />
            <View style={styles.statusItem}>
              <Ionicons name="checkmark-circle-outline" size={20} color="green" />
              <Text style={styles.statusText}>Order Confirmed</Text>
            </View>
            <View style={styles.statusLine} />
            <View style={styles.statusItem}>
              <Ionicons name="time-outline" size={20} color="orange" />
              <Text style={styles.statusText}>In Transit</Text>
            </View>
            <View style={styles.statusLine} />
            <View style={styles.statusItem}>
              <Ionicons name="ellipse-outline" size={20} color="gray" />
              <Text style={styles.statusText}>Delivered</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('CustomerHome')}>
          <Ionicons name="home-outline" size={24} color="white" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Orders')}>
          <Ionicons name="cart-outline" size={24} color="white" />
          <Text style={styles.navText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-outline" size={24} color="white" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#2b2b2b",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  mainCard: {
    backgroundColor: "#FF8553",
    borderRadius: 10,
    padding: 20,
    margin: 16,
    alignItems: "center",
  },
  boxImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  mainCardText: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "#2b2b2b",
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  detailTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailText: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  statusContainer: {
    padding: 20,
    backgroundColor: "#2b2b2b",
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statusTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statusTimeline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusItem: {
    alignItems: "center",
  },
  statusText: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  },
  statusLine: {
    width: 30,
    height: 2,
    backgroundColor: "gray",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2b2b2b",
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  },
});

export default OrderDetailsPage;
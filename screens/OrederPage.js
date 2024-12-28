import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const OrderPage = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const orders = [
    { id: "O123H148", status: "Completed", from: "Bandung", to: "Jakarta", weight: "5 kg", date: "2023-10-01" },
    { id: "O34P23F21", status: "In Transit", from: "Surabaya", to: "Bali", weight: "3 kg", date: "2023-10-02" },
    { id: "O12F32A48", status: "Pending", from: "Medan", to: "Aceh", weight: "2.5 kg", date: "2023-10-03" },
  ];

  const filters = ["All", "Completed", "In Transit", "Pending"];

  const renderOrder = ({ item }) => (
    <TouchableOpacity style={styles.orderCard} onPress={() => navigation.navigate('OrderDetails', { order: item })}>
      <View>
        <Text style={styles.orderId}>{`ID: ${item.id}`}</Text>
        <Text style={styles.orderRoute}>{`${item.from} → ${item.to}`}</Text>
        <Text style={styles.orderWeight}>{`Weight: ${item.weight}`}</Text>
        <Text style={styles.orderDate}>{`Date: ${item.date}`}</Text>
      </View>
      <Text style={[styles.orderStatus, styles[item.status.toLowerCase()]]}>{item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterButton, selectedFilter === filter && styles.selectedFilterButton]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={styles.filterButtonText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={orders.filter(order => selectedFilter === "All" || order.status === selectedFilter)}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={styles.orderList}
      />
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#2b2b2b",
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  selectedFilterButton: {
    backgroundColor: "#FF8553",
  },
  filterButtonText: {
    color: "white",
    fontSize: 14,
  },
  orderList: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  orderCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2b2b2b",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  orderId: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  orderRoute: {
    color: "#a6a6a6",
    fontSize: 12,
  },
  orderWeight: {
    color: "#a6a6a6",
    fontSize: 12,
  },
  orderDate: {
    color: "#a6a6a6",
    fontSize: 12,
  },
  orderStatus: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  completed: {
    color: "green",
  },
  intransit: {
    color: "orange",
  },
  pending: {
    color: "red",
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

export default OrderPage;
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, SafeAreaView, TextInput, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const CustomerHome = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [recentShipments, setRecentShipments] = useState([
    { id: "F123H148", status: "Completed", from: "Bandung", to: "Jakarta", weight: "5 kg" },
    { id: "L34P23F21", status: "In Transit", from: "Surabaya", to: "Bali", weight: "3 kg" },
    { id: "P12F32A48", status: "Pending", from: "Medan", to: "Aceh", weight: "2.5 kg" },
  ]);

 

  const renderShipment = ({ item }) => (
    <View style={styles.shipmentCard}>
      <View>
        <Text style={styles.shipmentId}>{`ID: ${item.id}`}</Text>
        <Text style={styles.shipmentRoute}>{`${item.from} → ${item.to}`}</Text>
        <Text style={styles.shipmentWeight}>{`Weight: ${item.weight}`}</Text>
      </View>
      <Text style={[styles.shipmentStatus, styles[item.status.toLowerCase()]]}>{item.status}</Text>
    </View>
  );

  const renderHeader = () => (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: "https://imgs.search.brave.com/RfeG4hvF2MTePm9rYsq8zqjbIA9vrL-S0yuvEs7zlGI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvdXNlci1waWN0/dXJlcy8xMDAvbWFs/ZTMtNTEyLnBuZw" }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Harshal Gadre</Text>
          <Text style={styles.userPoints}>goregaon, mumbai</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="information-circle-outline" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="white" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#a6a6a6" style={styles.searchIcon} />
        <TextInput
          placeholder="Track Your Package"
          placeholderTextColor="#a6a6a6"
          style={styles.searchBar}
        />
      </View>

      {/* Promo Card */}
      <View style={styles.promoCard}>
        <Image
          source={{ uri: "https://imgs.search.brave.com/ktKhr9tBxPAjMN3Oyp53Ipsm-HuAkoY8ofIE5GauPZg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTU3/Njc3MTkyL3Bob3Rv/L2NhcmRib2FyZC1i/b3hlcy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9c0xUQXhq/WTZNQkh0ZThIcjBl/d1ViRnZkSUVIR19k/U1lzRmlDTzVVR2ta/ND0" }} // Replace with your box image
          style={styles.promoImage}
        />
        <View style={styles.promoContent}>
          <Text style={styles.promoText}>Discount</Text>
          <Text style={styles.promoDiscount}>35% Off</Text>
          <TouchableOpacity style={styles.promoButton}>
            <Text style={styles.promoButtonText}>Get Discount</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Price Point Info Clipboard */}
      <View style={styles.pricePointContainer}>
        <View style={styles.pricePointCard}>
          <Ionicons name="pricetag-outline" size={30} color="white" />
          <Text style={styles.pricePointTitle}>Price</Text>
          <Text style={styles.pricePointValue}>$1234.56</Text>
        </View>
        <View style={styles.pricePointCard}>
          <Ionicons name="star-outline" size={30} color="white" />
          <Text style={styles.pricePointTitle}>Points</Text>
          <Text style={styles.pricePointValue}>4251</Text>
        </View>
        <View style={styles.pricePointCard}>
          <Ionicons name="newspaper-outline" size={30} color="white" />
          <Text style={styles.pricePointTitle}>News</Text>
          <Text style={styles.pricePointValue}>5</Text>
        </View>
        <View style={styles.pricePointCard}>
          <Ionicons name="information-circle-outline" size={30} color="white" />
          <Text style={styles.pricePointTitle}>Info</Text>
          <Text style={styles.pricePointValue}>10</Text>
        </View>
      </View>

      {/* Recent Shipments Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Shipments</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recentShipments}
        keyExtractor={(item) => item.id}
        renderItem={renderShipment}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.shipmentList}
      />

      {/* Bottom Navigation */}
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#2b2b2b",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  userPoints: {
    color: "#FF8553",
    fontSize: 16,
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 16,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    padding: 10,
    margin: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    color: "white",
  },
  promoCard: {
    backgroundColor: "#FF8553",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
  },
  promoImage: {
    width: 80,
    height: 80,
  },
  promoContent: {
    marginLeft: 16,
    flex: 1,
  },
  promoText: {
    color: "white",
    fontSize: 16,
  },
  promoDiscount: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  promoButton: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  promoButtonText: {
    color: "#FF8553",
    fontSize: 16,
  },
  pricePointContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  pricePointCard: {
    backgroundColor: "#2b2b2b",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    width: "22%",
  },
  pricePointTitle: {
    color: "white",
    fontSize: 16,
    marginTop: 8,
  },
  pricePointValue: {
    color: "#FF8553",
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  seeAll: {
    color: "orange",
    fontSize: 14,
  },
  shipmentList: {
    paddingHorizontal: 16,
  },
  shipmentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2b2b2b",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  shipmentId: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  shipmentRoute: {
    color: "#a6a6a6",
    fontSize: 12,
  },
  shipmentWeight: {
    color: "#a6a6a6",
    fontSize: 12,
  },
  shipmentStatus: {
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

export default CustomerHome;
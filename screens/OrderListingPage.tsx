// screens/OrderListingPage.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import moment from 'moment';
import { fetchOrderList } from '../api/orderApi';

interface OrderListingPageProps {
  navigation: NavigationProp<any>;
}

const OrderListingPage: React.FC<OrderListingPageProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [orderList, setOrderList] = useState<any[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const orders = await fetchOrderList();
      setOrderList(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetails = (orderId: number) => {
    navigation.navigate('OrderDetails', { orderId });
  };

  const renderItem = ({ item }: { item: any }) => {
    // Format createdAt date and time
    const formattedCreatedAt = moment(item.attributes.createdAt).format('MMMM Do YYYY, h:mm:ss a');
  
    return (
      <View style={styles.orderItem}>
        <Text style={styles.title}>Order at {formattedCreatedAt}</Text>
        <Text style={styles.orderItemText}>Transaction ID: {item.attributes.trnxId}</Text>
        <Text style={styles.orderItemText}>Billing Address: {item.attributes.billing_address}</Text>
        <Text style={styles.orderItemText}>Price: {item.attributes.price}</Text>
        <Text style={styles.orderItemText}>Quantity: {item.attributes.quantity}</Text>
        <Button
          title="View Details"
          onPress={() => handleDetails(item.id)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={orderList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.orderList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  orderList: {
    width: '90%',
    marginTop: 20,
  },
  orderItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  orderItemText: {
    marginBottom: 5,
  },
});

export default OrderListingPage;

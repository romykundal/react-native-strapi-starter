// screens/OrderDetailsPage.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { fetchOrderDetails } from '../api/orderApi';

interface OrderDetailsPageProps {
  route: RouteProp<any, 'OrderDetails'>;
}

const OrderDetailsPage: React.FC<OrderDetailsPageProps> = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const { orderId } = route.params || {};
    if (orderId) {
      fetchOrder(orderId);
    }
  }, [route.params]);

  const fetchOrder = async (orderId: number) => {
    try {
      const details = await fetchOrderDetails(orderId);
      setOrderDetails(details);
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!orderDetails) {
    return (
      <View style={styles.container}>
        <Text>No order details found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Transaction ID:</Text>
        <Text style={styles.value}>{orderDetails.attributes.trnxId}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Billing Address:</Text>
        <Text style={styles.value}>{orderDetails.attributes.billing_address}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>{orderDetails.attributes.price}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Quantity:</Text>
        <Text style={styles.value}>{orderDetails.attributes.quantity}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Customer Name:</Text>
        <Text style={styles.value}>{orderDetails.attributes.customer_id.data[0].attributes.name}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Customer Email:</Text>
        <Text style={styles.value}>{orderDetails.attributes.customer_id.data[0].attributes.email}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Customer Phone:</Text>
        <Text style={styles.value}>{orderDetails.attributes.customer_id.data[0].attributes.phoneNumber}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Product Name:</Text>
        <Text style={styles.value}>{orderDetails.attributes.product_id.data.attributes.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flex: 1,
  },
});

export default OrderDetailsPage;

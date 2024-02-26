// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrderListingPage from './screens/OrderListingPage';
import OrderDetailsPage from './screens/OrderDetailsPage';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="OrderListing" component={OrderListingPage} />
        <Stack.Screen name="OrderDetails" component={OrderDetailsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

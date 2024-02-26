// api/orderApi.ts
interface Order {
    id: number;
    attributes: {
      trnxId: string;
      billing_address: string;
      price: string;
      quantity: string;
    };
  }
  
  export const fetchOrderList = async (): Promise<Order[]> => {
    // Simulate API call
    const response = await fetch('http://localhost:1337/api/orders');
    const data = await response.json();
    return data.data;
  };
  
  export const fetchOrderDetails = async (orderId: number): Promise<any> => {
    // Simulate API call
    const response = await fetch(`http://localhost:1337/api/orders/${orderId}?populate=*`);
    const data = await response.json();
    return data.data;
  };
  
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
  const BASE_URL = "http://localhost:1337/";
  export const fetchOrderList = async (): Promise<Order[]> => {
    // Simulate API call
    const response = await fetch(`${BASE_URL}api/orders`);
    const data = await response.json();
    console.log("data response debug order>>>>>>>", data)
    return data.data;
  };
  
  export const fetchOrderDetails = async (orderId: number): Promise<any> => {
    // Simulate API call
    const response = await fetch(`${BASE_URL}api/orders/${orderId}?populate=*`);
    const data = await response.json();
    console.log("order details response debug<<<<<<<>>>>>>>", data)
    return data.data;
  };
  
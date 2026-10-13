export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  customer: string;
  items: string;
  total: number;
  status: string;
}

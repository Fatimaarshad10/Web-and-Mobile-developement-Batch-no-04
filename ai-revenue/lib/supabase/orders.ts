import { supabase } from "./client";

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  storeId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerPostalCode: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
}

export interface OrderInsert {
  storeId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerPostalCode: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status?: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
}

export async function getOrdersForStore(storeId: string): Promise<Order[]> {
  const { data: ordersData, error: ordersError } = await supabase
    .from("orders")
    .select("*")
    .eq("store_id", storeId)
    .order("created_at", { ascending: false });

  if (ordersError) {
    throw new Error(ordersError.message);
  }

  const orderIds = (ordersData ?? []).map((o) => o.id);

  const { data: itemsData, error: itemsError } = await supabase
    .from("order_items")
    .select("*")
    .in("order_id", orderIds);

  if (itemsError) {
    throw new Error(itemsError.message);
  }

  const itemsByOrderId = new Map<string, OrderItem[]>();
  for (const row of itemsData ?? []) {
    const list = itemsByOrderId.get(row.order_id) ?? [];
    list.push({
      id: row.id,
      orderId: row.order_id,
      productId: row.product_id,
      name: row.name,
      price: Number(row.price),
      quantity: row.quantity,
    });
    itemsByOrderId.set(row.order_id, list);
  }

  return (ordersData ?? []).map((row) => ({
    id: row.id,
    storeId: row.store_id,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    customerAddress: row.customer_address,
    customerCity: row.customer_city,
    customerPostalCode: row.customer_postal_code,
    items: itemsByOrderId.get(row.id) ?? [],
    subtotal: Number(row.subtotal),
    shipping: Number(row.shipping),
    total: Number(row.total),
    status: row.status,
    createdAt: row.created_at,
  }));
}

export async function createOrder(order: OrderInsert): Promise<Order> {
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert({
      store_id: order.storeId,
      customer_name: order.customerName,
      customer_email: order.customerEmail,
      customer_phone: order.customerPhone,
      customer_address: order.customerAddress,
      customer_city: order.customerCity,
      customer_postal_code: order.customerPostalCode,
      subtotal: order.subtotal,
      shipping: order.shipping,
      total: order.total,
      status: order.status ?? "Pending",
    })
    .select("*")
    .single();

  if (orderError || !orderData) {
    throw new Error(orderError?.message ?? "Failed to create order.");
  }

  const orderItemsPayload = order.items.map((item) => ({
    order_id: orderData.id,
    product_id: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  const { data: itemsData, error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItemsPayload)
    .select("*");

  if (itemsError) {
    throw new Error(itemsError.message);
  }

  return {
    id: orderData.id,
    storeId: orderData.store_id,
    customerName: orderData.customer_name,
    customerEmail: orderData.customer_email,
    customerPhone: orderData.customer_phone,
    customerAddress: orderData.customer_address,
    customerCity: orderData.customer_city,
    customerPostalCode: orderData.customer_postal_code,
    items: (itemsData ?? []).map((row) => ({
      id: row.id,
      orderId: row.order_id,
      productId: row.product_id,
      name: row.name,
      price: Number(row.price),
      quantity: row.quantity,
    })),
    subtotal: Number(orderData.subtotal),
    shipping: Number(orderData.shipping),
    total: Number(orderData.total),
    status: orderData.status,
    createdAt: orderData.created_at,
  };
}

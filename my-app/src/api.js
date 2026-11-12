
export const FACEBOOK_URL = "https://www.facebook.com/bdaypk";
export const WHATSAPP_NUMBER = "923412319887";

const API_URL = "https://sk-event-backend.onrender.com";

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/api/products`);
  if (!res.ok) throw new Error("Could not load packages from the server");
  return res.json();
}

export async function placeOrder(payload) {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Order failed");
  return data;
}

export async function sendMessage(payload) {
  const res = await fetch(`${API_URL}/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Message failed");
  return data;
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { placeOrder } from "../api";
import { useCart } from "../context/CartContext";
import BookingConfirmation from "../component/BookingConfirmation";

export default function Cart() {
  const { items, updateQty, remove, total, clear } = useCart();
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    eventDate: "",
    eventTime: "",
    notes: "",
  });
  const [completedOrder, setCompletedOrder] = useState(null);
  const [error, setError] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const checkout = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const orderTotal = total;
      const order = await placeOrder({
        ...form,
        items: items.map((item) => ({
          productId: item.id,
          name: item.name,
          price: Number(item.price),
          qty: Number(item.qty),
        })),
        total: Number(orderTotal),
      });

      clear();
      setCompletedOrder({
        id: order._id,
        total: orderTotal,
        name: form.customerName,
        items: items.map(({ name, qty }) => ({ name, qty })),
        eventDate: form.eventDate,
        eventTime: form.eventTime,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (completedOrder) {
    return <BookingConfirmation {...completedOrder} />;
  }

  if (!items.length) {
    return (
      <section className="section center">
        <h2>Cart is empty</h2>
        <p className="muted">Add a package, then checkout. Data saves in MongoDB.</p>
        <Link className="btn red" to="/packages">
          Browse packages
        </Link>
      </section>
    );
  }

  return (
    <section className="section">
      <h2>Cart</h2>
      {error ? <p className="error">{error}</p> : null}
      <div className="contact-grid" style={{ marginTop: 24 }}>
        <div className="cart-list">
          {items.map((item) => (
            <div className="cart-row" key={item.id}>
              <img src={item.image} alt="" />
              <div>
                <strong>{item.name}</strong>
                <p className="muted">Rs. {item.price.toLocaleString()}</p>
                <div className="qty">
                  <button type="button" onClick={() => updateQty(item.id, item.qty - 1)}>
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button type="button" onClick={() => updateQty(item.id, item.qty + 1)}>
                    +
                  </button>
                  <button
                    className="remove-button"
                    type="button"
                    onClick={() => remove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <strong>Rs. {(item.price * item.qty).toLocaleString()}</strong>
            </div>
          ))}
          <p className="price">Total: Rs. {total.toLocaleString()}</p>
        </div>
        <form onSubmit={checkout}>
          <h3>Checkout</h3>
          <input
            name="customerName"
            placeholder="Name"
            value={form.customerName}
            onChange={onChange}
            required
          />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} />
          <input name="address" placeholder="Venue / address" value={form.address} onChange={onChange} />
          <input name="eventDate" type="date" value={form.eventDate} onChange={onChange} />
          <input name="eventTime" type="time" value={form.eventTime} onChange={onChange} />
          <textarea name="notes" placeholder="Notes" value={form.notes} onChange={onChange} />
          <button className="btn red" type="submit" disabled={!items.length}>
            Place booking
          </button>
        </form>
      </div>
    </section>
  );
}
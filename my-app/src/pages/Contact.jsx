import { useState } from "react";
import { FACEBOOK_URL, WHATSAPP_NUMBER, sendMessage } from "../api";
import contactBanner from "../images/contact-banner.png";
import BookingConfirmation from "../component/BookingConfirmation";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "Birthday Planning",
    eventDate: "",
    eventTime: "",
    budget: "",
    message: "",
  });
  const [completedRequest, setCompletedRequest] = useState(null);
  const [error, setError] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const request = await sendMessage(form);
      setCompletedRequest({
        id: request._id,
        name: form.name,
        packageName: form.eventType,
        budget: form.budget,
        eventDate: form.eventDate,
        eventTime: form.eventTime,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (completedRequest) {
    return <BookingConfirmation {...completedRequest} inquiry />;
  }

  return (
    <>
      <section className="page-hero contact-hero">
        <img
          className="contact-banner-image"
          src={contactBanner}
          alt="Event reception decorated with flowers and balloons"
        />
        <h1>Contact Us</h1>
      </section>
      <section className="section">
        <div className="contact-grid">
          <div>
            <h2>Book a birthday setup</h2>
            <p className="muted">Karachi · Balloons, themes, inflatables and full packages.</p>
            <p style={{ marginTop: 12 }}>
              Facebook:{" "}
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" style={{ color: "#1877f2" }}>
                facebook.com/bdaypk
              </a>
            </p>
            <p>
              Phone / WhatsApp:{" "}
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
                03234500887
              </a>
            </p>
          </div>
          <form onSubmit={onSubmit}>
            {error ? <p className="error">{error}</p> : null}
            <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
            <input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} required />
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} />
            <select name="eventType" value={form.eventType} onChange={onChange}>
              <option>Birthday Planning</option>
              <option>Balloon decoration</option>
              <option>Inflatable Rentals</option>
              <option>Packages</option>
            </select>
            <input name="eventDate" type="date" value={form.eventDate} onChange={onChange} />
            <input name="eventTime" type="time" value={form.eventTime} onChange={onChange} />
            <input
              name="budget"
              type="number"
              min="0"
              placeholder="Estimated budget (Rs.)"
              value={form.budget}
              onChange={onChange}
            />
            <textarea
              name="message"
              placeholder="Date, venue, theme"
              value={form.message}
              onChange={onChange}
              required
            />
            <button className="btn red" type="submit">
              Send booking request
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
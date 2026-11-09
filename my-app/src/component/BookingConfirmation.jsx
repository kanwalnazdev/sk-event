import { Link } from "react-router-dom";

const formatDate = (date) => {
  if (!date) return "Not provided";
  return new Date(`${date}T00:00:00`).toLocaleDateString();
};

export default function BookingConfirmation({
  id,
  name,
  items,
  packageName,
  budget,
  total,
  eventDate,
  eventTime,
  inquiry = false,
}) {
  const packageDetails = items?.length
    ? items.map((item) => `${item.name} × ${item.qty}`).join(", ")
    : packageName || "Not provided";
  const price = total != null
    ? `Rs. ${Number(total).toLocaleString()}`
    : budget
      ? `Rs. ${Number(budget).toLocaleString()}`
      : "To be confirmed";

  return (
    <section className="section booking-result-section">
      <div className="booking-confirmation" role="status">
        <div className="booking-confirmation-header">
          <strong>SK Events</strong>
          <span>{inquiry ? "Request received" : "Booking confirmed"}</span>
        </div>
        <div className="booking-confirmation-intro">
          <div className="booking-check" aria-hidden="true">✓</div>
          <h2>{inquiry ? "Request received!" : "You're all booked!"}</h2>
          <p>{inquiry ? "We’ll contact you soon to confirm the details." : "Your celebration journey starts here."}</p>
        </div>
        <div className="booking-summary">
          <h3>Booking summary</h3>
          <dl>
            <div><dt>Name</dt><dd>{name || "Not provided"}</dd></div>
            <div><dt>Booking ID</dt><dd className="booking-id">{id}</dd></div>
            <div><dt>{inquiry ? "Service / package" : "Order"}</dt><dd>{packageDetails}</dd></div>
            <div><dt>Event date</dt><dd>{formatDate(eventDate)}</dd></div>
            <div><dt>Event time</dt><dd>{eventTime || "Not provided"}</dd></div>
            <div className="booking-total"><dt>{inquiry ? "Estimated budget" : "Total amount"}</dt><dd>{price}</dd></div>
          </dl>
        </div>
        <Link className="btn booking-continue" to="/packages">Continue exploring</Link>
        <p className="booking-thanks">Thank you for choosing SK Events ✨</p>
      </div>
    </section>
  );
}

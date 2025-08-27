import React from "react";
import { toast } from "react-toastify";

export default function BookingCard({ booking, onCancel }) {
  const handleCancel = async () => {
    try {
      await onCancel(booking._id);
      toast.success("Booking cancelled!");
    } catch (err) {
      toast.error("Failed to cancel booking");
    }
  };

  return (
    <div style={{ padding: 12, border: "1px solid #ddd", marginBottom: 8, borderRadius: 6 }}>
      <div><strong>{booking.vehicle?.name || "Vehicle"}</strong></div>
      <div>{booking.fromPincode} ➝ {booking.toPincode}</div>
      <div>Start: {new Date(booking.startTime).toLocaleString()}</div>
      <div>End: {new Date(booking.endTime).toLocaleString()}</div>
      <button onClick={handleCancel} style={{ marginTop: 6, padding: "6px 12px" }}>Delet Booking</button>
    </div>
  );
}

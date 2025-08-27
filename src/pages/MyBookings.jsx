import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import BookingCard from "../components/BookingCard";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    await api.delete(`/bookings/${id}`);
    setBookings(bookings.filter(b => b._id !== id));
  };

  useEffect(() => { fetchBookings(); }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>My Bookings</h2>
      {loading ? <div>Loading...</div> : (
        bookings.map(b => <BookingCard key={b._id} booking={b} onCancel={cancelBooking} />)
      )}
    </div>
  );
}

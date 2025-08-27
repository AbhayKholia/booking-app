import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    try {
      await api.delete(`/bookings/${id}`);
      setBookings(bookings.filter((b) => b._id !== id));
      toast.success("Booking cancelled!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to cancel booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        My Bookings
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : bookings.length === 0 ? (
        <Typography variant="h6" color="text.secondary" sx={{ mt: 4 }}>
          You don’t have any bookings yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((b) => (
            <Grid item xs={12} md={6} lg={4} key={b._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 4,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {b.vehicle?.name || "Unknown Vehicle"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    From: {b.fromPincode} → To: {b.toPincode}
                  </Typography>
                  <Typography variant="body2">
                    Start Time: {new Date(b.startTime).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    Capacity: {b.vehicle?.capacityKg} kg | Tyres:{" "}
                    {b.vehicle?.tyres}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={() => cancelBooking(b._id)}
                  >
                    Cancel Booking
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

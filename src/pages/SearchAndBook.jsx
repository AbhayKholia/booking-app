// import React, { useState } from "react";
// import { api } from "../api/api";
// import { toast } from "react-toastify";
// import BookingCard from "../components/BookingCard";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// export default function SearchAndBook() {
//   const [form, setForm] = useState({ capacityRequired: "", fromPincode: "", toPincode: "" });
//   const [startTime, setStartTime] = useState(new Date());
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const searchVehicles = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/vehicles/available", {
//         params: {
//           ...form,
//           capacityRequired: Number(form.capacityRequired),
//           startTime: startTime.toISOString()
//         }
//       });
//       setVehicles(res.data);
//     } catch (err) {
//       toast.error(err.response?.data?.error || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const bookVehicle = async (vehicleId) => {
//     try {
//       await api.post("/bookings", {
//         vehicleId,
//         fromPincode: form.fromPincode,
//         toPincode: form.toPincode,
//         startTime: startTime.toISOString(),
//         customerId: "1234"
//       });
//       toast.success("Vehicle booked successfully!");
//       searchVehicles(); // refresh availability
//     } catch (err) {
//       toast.error(err.response?.data?.error || err.message);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Search & Book</h2>
//       <div>
//         <input name="capacityRequired" placeholder="Capacity Required" value={form.capacityRequired} onChange={handleChange} type="number" />
//         <input name="fromPincode" placeholder="From Pincode" value={form.fromPincode} onChange={handleChange} />
//         <input name="toPincode" placeholder="To Pincode" value={form.toPincode} onChange={handleChange} />
//         <DatePicker selected={startTime} onChange={setStartTime} showTimeSelect dateFormat="Pp" />
//         <button onClick={searchVehicles} disabled={loading}>{loading ? "Searching..." : "Search Availability"}</button>
//       </div>

//       <div style={{ marginTop: 20 }}>
//         {vehicles.length === 0 && <div>No vehicles available</div>}
//         {vehicles.map(v => (
//           <div key={v._id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 8, borderRadius: 6 }}>
//             <div><strong>{v.name}</strong></div>
//             <div>Capacity: {v.capacityKg} kg | Tyres: {v.tyres}</div>
//             <div>Estimated Ride Duration: {v.estimatedRideDurationHours} hours</div>
//             <button onClick={() => bookVehicle(v._id)}>Book Now</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  CircularProgress,
} from "@mui/material";

export default function SearchAndBook() {
  const [form, setForm] = useState({
    capacityRequired: "",
    fromPincode: "",
    toPincode: "",
  });
  const [startTime, setStartTime] = useState(new Date());
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const searchVehicles = async () => {
    setLoading(true);
    try {
      const res = await api.get("/vehicles/available", {
        params: {
          ...form,
          capacityRequired: Number(form.capacityRequired),
          startTime: startTime.toISOString(),
        },
      });
      setVehicles(res.data);
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const bookVehicle = async (vehicleId) => {
    try {
      await api.post("/bookings", {
        vehicleId,
        fromPincode: form.fromPincode,
        toPincode: form.toPincode,
        startTime: startTime.toISOString(),
        customerId: "1234",
      });
      toast.success("Vehicle booked successfully!");
      searchVehicles(); // refresh availability
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Search & Book Vehicle
      </Typography>

      {/* Search Form */}
      <Card sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Capacity Required (kg)"
                name="capacityRequired"
                value={form.capacityRequired}
                onChange={handleChange}
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="From Pincode"
                name="fromPincode"
                value={form.fromPincode}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="To Pincode"
                name="toPincode"
                value={form.toPincode}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <DatePicker
                selected={startTime}
                onChange={setStartTime}
                showTimeSelect
                dateFormat="Pp"
                customInput={<TextField fullWidth label="Start Time" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} mt={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={searchVehicles}
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} />}
              >
                {loading ? "Searching..." : "Search Availability"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Results */}
      <Grid container spacing={3}>
        {vehicles.length === 0 && !loading && (
          <Typography variant="h6" color="text.secondary">
            No vehicles available.
          </Typography>
        )}
        {vehicles.map((v) => (
          <Grid item xs={12} md={6} lg={4} key={v._id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {v.name}
                </Typography>
                <Typography>Capacity: {v.capacityKg} kg</Typography>
                <Typography>Tyres: {v.tyres}</Typography>
                <Typography color="secondary" fontWeight="medium">
                  Estimated Ride Duration: {v.estimatedRideDurationHours} hours
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => bookVehicle(v._id)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

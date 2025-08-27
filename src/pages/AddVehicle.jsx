// import React, { useState } from "react";
// import { api } from "../api/api";
// import { toast } from "react-toastify";

// export default function AddVehicle() {
//   const [vehicle, setVehicle] = useState({ name: "", capacityKg: "", tyres: "" });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setVehicle({ ...vehicle, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await api.post("/vehicles", {
//         name: vehicle.name,
//         capacityKg: Number(vehicle.capacityKg),
//         tyres: Number(vehicle.tyres),
//       });
//       toast.success("Vehicle added successfully!");
//       setVehicle({ name: "", capacityKg: "", tyres: "" });
//     } catch (err) {
//       toast.error(err.response?.data?.error || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Add Vehicle</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Name" value={vehicle.name} onChange={handleChange} required />
//         <input name="capacityKg" placeholder="Capacity (kg)" value={vehicle.capacityKg} onChange={handleChange} type="number" required />
//         <input name="tyres" placeholder="Tyres" value={vehicle.tyres} onChange={handleChange} type="number" required />
//         <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Vehicle"}</button>
//       </form>
//     </div>
//   );
// }



import React, { useState } from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

export default function AddVehicle() {
  const [vehicle, setVehicle] = useState({ name: "", capacityKg: "", tyres: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/vehicles", {
        name: vehicle.name,
        capacityKg: Number(vehicle.capacityKg),
        tyres: Number(vehicle.tyres),
      });
      toast.success("Vehicle added successfully!");
      setVehicle({ name: "", capacityKg: "", tyres: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 5, borderRadius: 3 }}>
      <Typography variant="h5" mb={3} fontWeight="bold" color="primary">
        Add New Vehicle
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <TextField
          label="Vehicle Name"
          name="name"
          value={vehicle.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Capacity (kg)"
          name="capacityKg"
          type="number"
          value={vehicle.capacityKg}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Number of Tyres"
          name="tyres"
          type="number"
          value={vehicle.tyres}
          onChange={handleChange}
          fullWidth
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ py: 1.5, mt: 1 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Add Vehicle"}
        </Button>
      </Box>
    </Paper>
  );
}


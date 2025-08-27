// import React from "react";
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav style={{ padding: "12px 24px", background: "#0b74de", color: "white" }}>
//       <Link to="/" style={{ marginRight: 16, color: "white", fontWeight: "bold" }}>Home</Link>
//       <Link to="/add-vehicle" style={{ marginRight: 16, color: "white" }}>Add Vehicle</Link>
//       <Link to="/search-book" style={{ marginRight: 16, color: "white" }}>Search & Book</Link>
//       <Link to="/my-bookings" style={{ color: "white" }}>My Bookings</Link>
//     </nav>
//   );
// }


import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { path: "/", label: "Home" },
    { path: "/add-vehicle", label: "Add Vehicle" },
    { path: "/search-book", label: "Search & Book" },
    { path: "/my-bookings", label: "My Bookings" },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#0b74de" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          FleetLink
        </Typography>
        <Box>
          {links.map((link) => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              sx={{
                color: location.pathname === link.path ? "#ffeb3b" : "white",
                fontWeight: location.pathname === link.path ? "bold" : "normal",
                textTransform: "none",
                marginRight: 2,
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

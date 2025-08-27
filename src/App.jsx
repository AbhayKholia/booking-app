import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import AddVehicle from "./pages/AddVehicle";
import SearchAndBook from "./pages/SearchAndBook";
import MyBookings from "./pages/MyBookings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/search-book" element={<SearchAndBook />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

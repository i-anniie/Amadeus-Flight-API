import express from "express";
import protect from "../middleware/authMiddleware.js";
import searchFlights from "../controllers/flightSearchController.js";
import {
  bookFlight,
  getBookings,
} from "../controllers/flightBookController.js";

const router = express.Router();

router.post("/search-flights", protect, searchFlights);
router.post("/book-flight", protect, bookFlight);
router.get("/bookings", protect, getBookings);

export default router;

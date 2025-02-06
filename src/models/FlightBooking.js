import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookingReference: {
      type: String,
      required: true,
      unique: true,
    },
    flightOfferId: {
      type: String,
      required: true,
    },
    flightDetails: {
      type: Object,
      required: true,
    },
    travelers: [
      {
        firstName: String,
        lastName: String,
        dateOfBirth: String,
        gender: String,
        emailAddress: String,
        phone: String,
      },
    ],
    totalPrice: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Confirmed", "Cancelled"],
      default: "Confirmed",
    },
  },
  { timestamps: true }
);

const FlightBooking = mongoose.model("Bookings", bookingSchema);

export default FlightBooking;

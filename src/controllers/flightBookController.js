import axios from "axios";
import getAmadeusToken from "../config/amadeus.js";
import FlightBooking from "../models/FlightBooking.js";

export const bookFlight = async (req, res) => {
  const { passengers, flightOffers } = req.body;

  if (!passengers || !Array.isArray(passengers) || passengers.length === 0) {
    return res
      .status(400)
      .json({ message: "Passengers information is required" });
  }

  if (
    !flightOffers ||
    !Array.isArray(flightOffers) ||
    flightOffers.length === 0
  ) {
    return res
      .status(400)
      .json({ message: "Flight offer details is required" });
  }

  try {
    const token = await getAmadeusToken();

    const bookingRequest = {
      data: {
        type: "flight-order",
        flightOffers,
        travelers: passengers.map((passenger, index) => ({
          id: (index + 1).toString(),
          dateOfBirth: passenger.dateOfBirth,
          name: {
            firstName: passenger.firstName,
            lastName: passenger.lastName,
          },
          gender: passenger.gender,
          contact: {
            emailAddress: passenger.emailAddress,
            phones: [
              {
                deviceType: "MOBILE",
                countryCallingCode: passenger.countryCallingCode,
                number: passenger.phone,
              },
            ],
          },
        })),
      },
    };

    const response = await axios.post(
      "https://test.api.amadeus.com/v1/booking/flight-orders",
      bookingRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const {
      id: bookingReference,
      flightOffers: bookedFlights,
      travelers,
    } = response.data.data;
    const totalPrice = bookedFlights[0]?.price?.grandTotal;
    const currency = bookedFlights[0]?.price?.currency;

    const newBooking = new FlightBooking({
      userId: req.user._id,
      bookingReference,
      flightOfferId: bookedFlights[0]?.id,
      flightDetails: bookedFlights[0],
      travelers: travelers.map((traveler) => ({
        firstName: traveler.name.firstName,
        lastName: traveler.name.lastName,
        dateOfBirth: traveler.dateOfBirth,
        gender: traveler.gender,
        emailAddress: traveler.contact.emailAddress,
        phone: traveler.contact.phones[0]?.number,
      })),
      totalPrice,
      currency,
    });

    await newBooking.save();

    res
      .status(201)
      .json({ message: "Flight Booking Successful", booking: newBooking });
  } catch (error) {
    console.error("Booking Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Flight booking failed",
      error: error.response?.data || error.message,
    });
  }
};

export const getBookings = async (req, res) => {
  try {
    const userId = req.user._id.toString();

    const bookings = await FlightBooking.find({ userId }).sort({ created: -1 });

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res
      .status(200)
      .json({ message: "Booking retrieved successfully", bookings });
  } catch (error) {
    console.log("Flight booking fetching error", error.message);
    res
      .status(500)
      .json({ message: "Failed to retrieve bookings", error: error.message });
  }
};

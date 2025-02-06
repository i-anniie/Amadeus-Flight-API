import axios from "axios";
import getAmadeusToken from "../config/amadeus.js";

const searchFlights = async (req, res) => {
  const { origin, destination, date, travelers } = req.body;

  if (!origin || !destination || !date || !travelers) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const token = await getAmadeusToken();

    const response = await axios.get(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },

        params: {
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate: date,
          adults: travelers,
        },
      }
    );

    res.status(200).json({
      message: "Flight search successful",
      totalFlights: response.data.data.length,
      data: response.data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Flight search failed", error: error.response?.data });
  }
};

export default searchFlights;

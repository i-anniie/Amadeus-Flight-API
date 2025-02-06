import axios from "axios";

let amadeusToken = null;
let tokenExpiry = null;

const getAmadeusToken = async () => {
  const currentTime = Math.floor(Date.now() / 1000);

  if (amadeusToken && tokenExpiry && currentTime < tokenExpiry) {
    return amadeusToken;
  }

  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AMADEUS_API_KEY,
        client_secret: process.env.AMADEUS_API_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    amadeusToken = response.data.access_token;
    tokenExpiry = currentTime + response.data.expires_in;

    return amadeusToken;
  } catch (error) {
    console.log(
      "Amadeus API Authentication failed",
      error.response?.data || error.message
    );
    throw new Error("Amadeus API integration failed");
  }
};

export default getAmadeusToken;

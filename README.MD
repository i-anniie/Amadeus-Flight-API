# Flight Booking API

## 🚀 Overview

This is a **Flight Booking API** that allows users to search for flights, book them, and retrieve their booking history. It integrates with the **Amadeus API** for real-time flight data and manages user authentication with **JWT** and **MongoDB**.

---

## 📂 Project Structure

```
/src
  ├── config
  │     ├── db.js                  # Database connection
  │     ├── amadeus.js             # Fetches Amadeus API token
  ├── controllers
  │     ├── authController.js       # Handles authentication (register, login)
  │     ├── flightBookController.js # Handles flight booking
  │     ├── flightSearchController.js # Handles flight search
  ├── middleware
  │     ├── authMiddleware.js       # JWT authentication middleware
  ├── models
  │     ├── User.js                 # User model (MongoDB)
  │     ├── FlightBooking.js        # Booking model (MongoDB)
  ├── routes
  │     ├── authRoutes.js           # User authentication routes
  │     ├── flightRoutes.js         # Flight search & booking routes
  ├── utils
  │     ├── generateToken.js        # JWT token generation
  ├── server.js                      # Entry point
```

---

## 🔧 Installation & Setup

### 1️⃣ **Clone the repository**

```sh
git clone <repo-url>
cd flight-booking-api
```

### 2️⃣ **Install dependencies**

```sh
npm install
```

### 3️⃣ **Set up environment variables**

Create a `.env` file and add:

```
PORT=5000
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
AMADEUS_API_KEY=<your_amadeus_api_key>
AMADEUS_API_SECRET=<your_amadeus_api_secret>
```

### 4️⃣ **Start the server**

```sh
npm run dev  # Starts in development mode
```

---

## 📌 API Endpoints

### **1️⃣ User Authentication**

| Method | Endpoint             | Description                 |
| ------ | -------------------- | --------------------------- |
| `POST` | `/api/auth/register` | Register a new user         |
| `POST` | `/api/auth/login`    | Authenticate user & get JWT |

### **2️⃣ Flight Search & Booking**

| Method | Endpoint                      | Description                           |
| ------ | ----------------------------- | ------------------------------------- |
| `GET`  | `/api/flights/search-flights` | Search for flights (Amadeus API)      |
| `POST` | `/api/flights/book-flight`    | Book a flight (Amadeus API + MongoDB) |

**Example Booking Request (Body):**

```json
{
  "userId": "65a3f0e15b123456789abcde",
  "passengers": [
    {
      "firstName": "Michael",
      "lastName": "Smith",
      "dateOfBirth": "1985-10-10",
      "gender": "MALE",
      "emailAddress": "michael.smith@email.com",
      "countryCallingCode": "1",
      "phone": "9876543210"
    }
  ],
  "flightOffers": [ { ... Flight Offer Data from Search API ... } ]
}
```

### **3️⃣ Retrieve Past Bookings**

| Method | Endpoint                            | Description                      |
| ------ | ----------------------------------- | -------------------------------- |
| `GET`  | `/api/flights/bookings`             | Get all bookings (Auth required) |
| `GET`  | `/api/flights/bookings?userId=<id>` | Get bookings for a specific user |

---

## ✅ **Testing the API**

Use **Postman** to test API calls:

- Set `Authorization: Bearer <your-jwt-token>` in **Headers**
- Use `Content-Type: application/json`

---

## 🚀 Deployment

To deploy, use **Docker**, **Heroku**, or **Vercel**:

```sh
docker build -t flight-booking-api .
docker run -p 5000:5000 flight-booking-api
```

---

## 🛠 Tech Stack

- **Node.js** + **Express.js** (Backend API)
- **MongoDB + Mongoose** (Database)
- **JWT** (Authentication)
- **Amadeus API** (Flight Data & Booking)
- **Postman** (Testing API Endpoints)

---

## 📌 Next Steps

- ✅ Improve error handling
- ✅ Add pagination for bookings
- ✅ Integrate payment processing (future feature)

---

## 🤝 Contributors

👤 **Anwesh Mishra**\
📧 [anweshmishra2000@gmail.com](mailto:anweshmishra2000@gmail.com)\
🔗 [LinkedIn](https://www.linkedin.com/in/anweshmishra/)\
🖥️ [GitHub](https://github.com/i-anniie)

---

## ⚡ Final Notes

> This project provides a robust **Flight Booking API** using Amadeus, ensuring **secure authentication** and **efficient booking management**. Configure your API keys properly before deployment. 🚀

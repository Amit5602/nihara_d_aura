# Nihara D'Aura - Backend API Documentation

> **Live Production Base URL:** `https://api.niharadaura.com` (AWS EC2 + SSL HTTPS)  
> **Development Base URL:** `http://localhost:3000` (Local)  
> **Database:** MongoDB Atlas (`nihara_d_aura`)  
> **Headers Required:** `Content-Type: application/json`  
> *(Protected routes require `Authorization: Bearer <token>`)*

---

## Table of Contents
1. [Authentication APIs (`/api/auth`)](#1-authentication-apis-apiauth)
2. [User Profile APIs (`/api/profile`)](#2-user-profile-apis-apiprofile)
3. [Salon Flagship API (`/api/salon`)](#3-salon-flagship-api-apisalon)
4. [Offers & Coupons API (`/api/offers`)](#4-offers--coupons-api-apioffers)
5. [Cart APIs (`/api/cart`)](#5-cart-apis-apicart)
6. [Orders APIs (`/api/orders`)](#6-orders-apis-apiorders)
7. [Bookings APIs (`/api/bookings`)](#7-bookings-apis-apibookings)
8. [Products APIs (`/api/products`)](#8-products-apis-apiproducts)
9. [Categories APIs (`/api/categories`)](#9-categories-apis-apicategories)
10. [Services APIs (`/api/services`)](#10-services-apis-apiservices)
11. [Artists APIs (`/api/artists`)](#11-artists-apis-apiartists)
12. [Payments APIs (`/api/payment`)](#12-payments-apis-apipayment)
13. [Real-time WebSockets (Socket.io)](#13-real-time-websockets-socketio)

---

## 1. Authentication APIs (`/api/auth`)

### 1.1 Validate Session / Current User (`GET /api/auth/me`)
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "user": {
      "id": "673f4e19876a1c5d01234567",
      "fullName": "Abhay Kumar",
      "name": "Abhay Kumar",
      "email": "abhayyt93@gmail.com",
      "phone": "+91 92660 59846",
      "role": "user",
      "tier": "Royal Member",
      "rewardPoints": 0
    }
  }
  ```

### 1.2 Register User (`POST /api/auth/register`)
- **Body:** `{ "fullName": "Abhay Kumar", "email": "abhayyt93@gmail.com" }`
- **Response:** `{ "success": true, "message": "OTP sent successfully to your email" }`

### 1.3 Verify OTP (`POST /api/auth/verify-otp`)
- **Body:** `{ "email": "abhayyt93@gmail.com", "otp": "559319" }`
- **Response:** Returns JWT `token` and `user` object.

---

## 2. User Profile APIs (`/api/profile`)

- `GET /api/profile` - Current user profile
- `PUT /api/profile/update` - Update profile (`avatar`, `fullName`, `mobileNumber`, `tier`)
- `GET /api/profile/wishlist` - Get wishlist items
- `POST /api/profile/wishlist/:productId` - Toggle wishlist item
- `GET /api/profile/addresses` - Get user saved delivery addresses
- `POST /api/profile/addresses` - Add new address
- `PUT /api/profile/addresses/:id` - Update address
- `DELETE /api/profile/addresses/:id` - Delete address

---

## 3. Salon Flagship API (`/api/salon`)
- `GET /api/salon` - Returns flagship salon details, address, amenities, and timings.

---

## 4. Offers & Coupons API (`/api/offers`)
- `GET /api/offers` - Returns active promotional discounts (e.g. `ROYAL15`, `BRIDALGLOW`).

---

## 5. Cart APIs (`/api/cart`)
- `GET /api/cart` - Get user's server cart items
- `PUT /api/cart` - Sync cart items (`{ "items": [...] }`)

---

## 6. Orders APIs (`/api/orders`)
- `GET /api/orders` - Get user orders list
- `POST /api/orders` - Place new order
- `PATCH /api/orders/:id` - Update order status

---

## 7. Bookings APIs (`/api/bookings`)
- `GET /api/bookings` - Get user appointment bookings
- `POST /api/bookings` - Book appointment
- `DELETE /api/bookings/:id` - Cancel booking

---

## 8. Real-time WebSockets (`Socket.io`)
- **Endpoint:** `wss://api.niharadaura.com/socket.io/`
- Full WebSocket support for live notifications, order status, and customer chat.

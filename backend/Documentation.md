# Nihara D Aura - Backend API Documentation

> **Live Production Base URL:** `https://api.niharadaura.com` (AWS EC2 + SSL HTTPS)  
> **Development Base URL:** `http://localhost:3000` (Local)  
> **Database:** Connected to MongoDB Atlas `nihara_d_aura`

---

## 1. Authentication Flow - Passwordless OTP (`/api/auth`)

### `POST /api/auth/register`
- **Description:** Register a new user with Full Name & Email. Generates a 6-digit OTP (sent to user email & logged in console).
- **Body Fields:**
  ```json
  {
    "fullName": "Priya Sharma",
    "email": "priya@example.com"
  }
  ```
  *(Accepts `fullName` or `name`, and `email`. Optional: `mobileNumber`, `phone`, `avatar`)*
- **Response (200 OK):**
  ```json
  {
    "message": "OTP sent successfully to your email",
    "email": "priya@example.com"
  }
  ```

### `POST /api/auth/login`
- **Description:** Existing user requests OTP for login.
- **Body Fields:**
  ```json
  {
    "email": "priya@example.com"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Login OTP sent successfully to your email",
    "email": "priya@example.com"
  }
  ```

### `POST /api/auth/verify-otp`
- **Description:** Verify the OTP sent to email (for both Registration and Login). Once verified, account is created/activated immediately, returning the auth JWT token and complete user profile.
- **Body Fields:**
  ```json
  {
    "email": "priya@example.com",
    "otp": "654321"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Account verified successfully",
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": {
      "id": "6ace1ee8bac99793e66c0c76",
      "fullName": "Priya Sharma",
      "name": "Priya Sharma",
      "email": "priya@example.com",
      "mobileNumber": "",
      "phone": "",
      "avatar": "",
      "tier": "Royal Member",
      "rewardPoints": 0,
      "isVerified": true
    }
  }
  ```

---

## 2. User Profile API (`/api/profile`)

### `GET /api/profile`
- **Description:** Get all registered profiles or query by email (`/api/profile?email=rahul@example.com`).

### `GET /api/profile/:idOrEmail`
- **Description:** Get a single user profile by MongoDB ObjectId or Email address.

### `POST /api/profile`
- **Description:** Create a new user profile directly.
- **Body Fields:**
  ```json
  {
    "fullName": "Rahul Kumar",
    "email": "rahul@example.com",
    "mobileNumber": "9876543210",
    "avatar": "https://example.com/avatar.jpg"
  }
  ```

### `POST /api/profile/update`
- **Description:** Update user profile attributes (avatar, name, phone, tier, etc.).
- **Body Fields:**
  ```json
  {
    "email": "rahul@example.com",
    "avatar": "https://example.com/new-avatar.jpg",
    "fullName": "Rahul K.",
    "mobileNumber": "9876543211"
  }
  ```

---

## 3. Products API (`/api/products`)

### `GET /api/products`
- **Description:** List products with filters, sorting, search, and pagination.
- **Query Parameters:**
  - `category` (e.g. `Jewellery`, `Makeup`, `Nails`, `Candles`)
  - `categorySlug` (e.g. `jewellery`, `makeup`)
  - `subcategory` (e.g. `Rose Gold Chokers`)
  - `isFeatured` (`true` / `false`)
  - `isBestseller` (`true` / `false`)
  - `search` (keyword search in title & description)
  - `sort` (`price_asc`, `price_desc`, `rating`, `name`)
  - `page` (default: 1)
  - `limit` (default: 100)

### `GET /api/products/:slugOrId`
- **Description:** Get product details by slug or MongoDB ObjectId.
- **Example:** `GET /api/products/nihara-signature-18k-rose-gold-choker`

### `POST /api/products`
- **Description:** Create a new product.
- **Body Fields:**
  ```json
  {
    "name": "Nihara Signature 18K Rose Gold Choker",
    "slug": "nihara-signature-18k-rose-gold-choker",
    "category": "Jewellery",
    "categorySlug": "jewellery",
    "subcategory": "Rose Gold Chokers",
    "price": 24500,
    "originalPrice": 28000,
    "discountPercent": 13,
    "images": ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908"],
    "description": "Handcrafted in 18K Rose Gold with luminous uncut polki diamonds.",
    "variants": ["18K Rose Gold"],
    "sizes": ["Adjustable Silk Dori Choker"],
    "features": ["18K BIS Hallmarked"],
    "stock": 10,
    "isFeatured": true,
    "isBestseller": true
  }
  ```

### `PUT /api/products/:id`
- **Description:** Update an existing product by MongoDB ObjectId.

### `DELETE /api/products/:id`
- **Description:** Delete a product by MongoDB ObjectId.

---

## 4. Categories API (`/api/categories`)

### `GET /api/categories`
- **Description:** List all categories.

### `GET /api/categories/:slugOrId`
- **Description:** Get category details by slug or MongoDB ObjectId.
- **Example:** `GET /api/categories/jewellery`

### `POST /api/categories`
- **Description:** Create a new category.
- **Body Fields:**
  ```json
  {
    "name": "22K Real Gold & Diamond Jewellery",
    "slug": "jewellery",
    "itemCount": 30,
    "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
    "description": "BIS 22K/18K Hallmarked gold and diamond jewellery",
    "subcategories": ["Gold Earrings & Jhumkas", "Bridal Haar & Sets", "Rose Gold Chokers"]
  }
  ```

### `PUT /api/categories/:id`
- **Description:** Update an existing category by MongoDB ObjectId.

### `DELETE /api/categories/:id`
- **Description:** Delete a category by MongoDB ObjectId.

---

## 5. Services API (`/api/services`)

### `GET /api/services`
- **Description:** List all services. Supports `?category=Makeup` filter.

### `GET /api/services/:slugOrId`
- **Description:** Get service by slug or MongoDB ObjectId.
- **Example:** `GET /api/services/royal-bridal-glow-makeup-package`

### `POST /api/services`
- **Description:** Create a new service.
- **Body Fields:**
  ```json
  {
    "name": "Royal Bridal Glow & Makeup Package",
    "slug": "royal-bridal-glow-makeup-package",
    "category": "Makeup",
    "price": 18500,
    "durationMinutes": 180,
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
    "description": "Comprehensive royal bridal package including HD Airbrush makeup.",
    "inclusions": [
      "High-Definition Airbrush Makeup & Hydration Prep",
      "Intricate Bridal Hair Artistry"
    ]
  }
  ```

### `PUT /api/services/:id`
- **Description:** Update an existing service by MongoDB ObjectId.

### `DELETE /api/services/:id`
- **Description:** Delete a service by MongoDB ObjectId.

---

## 6. Artists API (`/api/artists`)

### `GET /api/artists`
- **Description:** List all artists and stylists.

### `GET /api/artists/:slugOrId`
- **Description:** Get artist by slug or MongoDB ObjectId.

### `POST /api/artists`
- **Description:** Create a new artist profile.
- **Body Fields:**
  ```json
  {
    "name": "Ananya Sharma",
    "slug": "ananya-sharma",
    "role": "Master Bridal Stylist",
    "experience": "8+ Years",
    "rating": 5,
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    "bio": "Specialized in celebrity HD Airbrush bridal makeup and royal hairstyling.",
    "specialties": ["Airbrush HD", "Bridal Saree Draping"]
  }
  ```

### `PUT /api/artists/:id`
- **Description:** Update an artist profile.

### `DELETE /api/artists/:id`
- **Description:** Delete an artist profile.

---

## 7. Database Seeds & Backup (`/seeds`)
The project includes pre-exported seed files from the `nihara_d_aura` database:
- `seeds/products.json` (90 catalog products)
- `seeds/categories.json` (4 core categories)
- `seeds/services.json` (4 salon & bridal packages)
- `seeds/artists.json` (artist profiles)
- `seeds/users.json` (registered customer records)
- Run `node seeds/seed.js` to seed or restore the database anytime.

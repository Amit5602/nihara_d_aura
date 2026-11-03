# Browser QA Report

**Project:** Nihara D'Aura  
**Run date:** 2026-11-03  
**Environment:** Local Vite frontend (`http://localhost:5173`) in browser; frontend configured to use its live API/socket host.

## Summary

The storefront routes and primary screens rendered. Product data, categories, and services loaded; product details and category filtering worked, and the booking wizard advanced from service selection to date/time. No broken images were found in the tested jewellery listing, and the selected mobile-width pages had no horizontal overflow.

The application is **not fully healthy end to end**: several live API paths returned 404, the offers error was visible in the UI, and the Socket.IO connection failed with a 404 handshake. Local backend startup also reported that port 3000 was already in use; the service already listening there returned a healthy `/api/health` response.

## Route coverage

| Area | Routes checked | Result |
|---|---|---|
| Storefront | `/`, `/products`, `/products/:id`, `/categories`, `/categories/:slug`, `/services`, `/services/:id` | Rendered. Product listing showed 90 items; category filtering showed 30 Artificial Jewellery items; product detail loaded with stock and purchase controls. |
| Booking and cart | `/book`, `/cart`, `/checkout`, `/wishlist` | Rendered. Booking advanced to Step 2 (date/time). Cart and wishlist showed their empty states. |
| Customer account | `/profile`, `/profile/edit`, `/orders`, `/orders/:id`, `/bookings`, `/bookings/:id`, `/addresses` | Profile routes redirected to login while unauthenticated. Orders, appointments, and saved addresses rendered after their data finished loading. |
| Authentication | `/login`, `/login?role=admin`, `/register`, `/verify-otp` | Forms rendered, including staff login mode. OTP, registration, and authentication were not submitted. |
| Admin | `/admin` and all tested admin subroutes (`analytics`, `products`, `categories`, `inventory`, `services`, `orders`, `appointments`, `coupons`, `customers`, `playbook`, `settings`) | All redirected to `/login?role=admin`, as expected without an authenticated admin session. Admin page internals could not be verified. |

## Interaction and responsive checks

- Opened a product detail from the listing and confirmed product information, variants, stock, and add-to-bag/buy buttons were present. No purchase action was submitted.
- Opened the site search and entered a query; the input accepted it. Search result correctness was not independently confirmed.
- Advanced the booking wizard from service selection to date/time. No booking was submitted.
- At a 390px mobile viewport, checked `/`, `/products`, `/book`, and `/cart`; none had horizontal document overflow.
- Checked 30 product images in the filtered jewellery listing; 0 failed to load.

## Findings

1. **Live API route failures:** Browser requests to `/api/offers`, `/api/cart`, `/api/profile/wishlist`, and `/api/salon` returned 404. The offers failure also produced a visible “Could not load live offers” message. Some screens use fallback data when these requests fail.
2. **Realtime unavailable:** The configured Socket.IO endpoint failed its WebSocket handshake with HTTP 404. Live updates were not verified.
3. **Local backend port conflict:** `npm run dev` started Vite on port 5173, but its backend process could not bind port 3000 (`EADDRINUSE`). A backend already listening on port 3000 returned HTTP 200 from `/api/health`; port 5000 was not listening.
4. **API configuration differs from the local backend:** The frontend environment points at the live API/socket host, so this browser run exercised the deployed API rather than the local service. The live products, categories, and services endpoints returned HTTP 200; the live health endpoint returned 404.

## Scope and limitations

This was a browser smoke/functional check, not an exhaustive acceptance or load test. No account creation, OTP delivery, payment, order placement, booking submission, or admin mutation was attempted. Admin routes were only checked through their unauthenticated protection redirect. Data-dependent screens can take several seconds to finish loading.

## Follow-up fixes

The local development configuration now points the frontend to the repository backend on port `5000`. The backend exposes the tested offers/salon routes and Socket.IO there; the frontend also uses Socket.IO's polling-first transport with WebSocket upgrade. Cart APIs now require authentication and store/replace items per user, while guest carts stay in local storage and persist through add, quantity change, reload, and remove. Private profile, order, booking, and address routes now redirect unauthenticated visitors to sign-in.

These changes were verified locally: the frontend build passed, tested public API routes returned HTTP 200, Socket.IO connected over WebSocket, and the guest cart flow passed in the browser. The running production API was not deployed or changed by this local work; deploy the updated backend and frontend with the production URLs described in the README to apply the fixes to the public site.

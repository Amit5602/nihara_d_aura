const express = require('express');
const router = express.Router();

const activeOffers = [
  {
    id: "off_royal15",
    code: "ROYAL15",
    discount: "15% OFF",
    title: "Royal Welcome Privilege",
    description: "Flat 15% savings on royal jewellery and signature bridal bookings.",
    minOrder: 2000,
    validUntil: "Ongoing"
  },
  {
    id: "off_bridal2000",
    code: "BRIDALGLOW",
    discount: "₹2,000 OFF",
    title: "Bridal Season Splendor",
    description: "Complimentary pre-bridal radiant hydration with luxury bridal makeup packages.",
    minOrder: 15000,
    validUntil: "Dec 2026"
  },
  {
    id: "off_aura500",
    code: "AURAGIFT",
    discount: "₹500 OFF",
    title: "Artisanal Home & Candles",
    description: "Flat ₹500 off on pure soy wax candle sets & artisanal reed diffusers.",
    minOrder: 2500,
    validUntil: "Ongoing"
  }
];

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    offers: activeOffers
  });
});

module.exports = router;


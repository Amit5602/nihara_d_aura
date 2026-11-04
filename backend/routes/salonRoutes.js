const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    salon: {
      name: "Nihara D'Aura Flagship Salon",
      address: "423 A, 4th Floor, Tower 3, NX One Tower, Greater Noida (West), UP - 201306",
      phone: "+91 92660 59846",
      email: "support@niharadaura.com",
      hours: "09:00 AM - 08:30 PM (Daily)",
      amenities: [
        "Valet Parking",
        "Complimentary Kashmiri Kahwa",
        "Private Bridal Suites",
        "Sterilized Tools"
      ]
    }
  });
});

module.exports = router;


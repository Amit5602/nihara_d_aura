const express = require('express');
const router = express.Router();

const sampleBookings = [
  {
    id: 'bk_88412',
    bookingId: 'BK-88412',
    title: 'Rose Quartz Luxe Gel Nail Extensions',
    services: [{ name: 'Rose Quartz Luxe Gel Nail Extensions', duration: '120 Mins', price: 3800 }],
    artist: 'Ananya Verma',
    date: 'Sat, Sep 19, 2026',
    timeSlot: '03:00 PM',
    location: 'At Home Service',
    address: '42 Lotus Heights, Jubilee Hills, Hyderabad',
    servicesSubtotal: 3800,
    travelCharge: 500,
    totalAmount: 4300,
    status: 'Completed',
    canCancel: false
  }
];

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    bookings: sampleBookings
  });
});

router.post('/', (req, res) => {
  const newBooking = {
    id: `bk_${Date.now()}`,
    bookingId: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
    status: 'Confirmed',
    canCancel: true,
    ...req.body
  };
  sampleBookings.unshift(newBooking);
  res.status(201).json({
    success: true,
    booking: newBooking
  });
});

router.delete('/:id', (req, res) => {
  const booking = sampleBookings.find(b => b.id === req.params.id || b.bookingId === req.params.id);
  if (booking) {
    booking.status = 'Cancelled';
    booking.canCancel = false;
    return res.status(200).json({ success: true, message: 'Appointment Cancelled' });
  }
  res.status(404).json({ success: false, message: 'Booking not found' });
});

module.exports = router;


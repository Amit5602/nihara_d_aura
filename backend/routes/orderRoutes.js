const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Sample mock orders store if none in db
const sampleOrders = [
  {
    id: 'ord_91823',
    orderId: 'ORD-91823',
    createdAt: '2026-10-24T10:30:00.000Z',
    items: [
      {
        id: 'prod_choker',
        name: 'Nihara Signature 18K Rose Gold Choker',
        price: 24500,
        quantity: 1,
        image: '/images/artificial-jewellery/choker-stock-rose.jpg'
      }
    ],
    shippingAddress: {
      fullName: 'Abhay Kumar',
      street: '42 Lotus Heights',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500033'
    },
    paymentMethod: 'Online Payment Gateway',
    totalAmount: 24500,
    status: 'Delivered',
    trackingNumber: 'DEL-91823-EXP'
  }
];

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    orders: sampleOrders
  });
});

router.post('/', (req, res) => {
  const newOrder = {
    id: `ord_${Date.now()}`,
    orderId: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    createdAt: new Date().toISOString(),
    status: 'Processing',
    ...req.body
  };
  sampleOrders.unshift(newOrder);
  res.status(201).json({
    success: true,
    order: newOrder
  });
});

router.patch('/:id', (req, res) => {
  const order = sampleOrders.find(o => o.id === req.params.id || o.orderId === req.params.id);
  if (order) {
    Object.assign(order, req.body);
    return res.status(200).json({ success: true, order });
  }
  res.status(404).json({ success: false, message: 'Order not found' });
});

module.exports = router;


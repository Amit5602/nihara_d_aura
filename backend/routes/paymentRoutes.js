const express = require('express');
const router = express.Router();

router.post('/create-intent', (req, res) => {
  const { amount } = req.body;
  res.status(200).json({
    success: true,
    paymentIntent: {
      intentId: 'pay_intent_' + Math.floor(10000000 + Math.random() * 90000000),
      amount: amount || 0,
      currency: 'INR',
      merchantName: "Nihara D'Aura Studio"
    }
  });
});

router.post('/verify', (req, res) => {
  const { transactionId, paymentMethod } = req.body;
  res.status(200).json({
    success: true,
    verification: {
      success: true,
      transactionId: transactionId || 'TXN_' + Math.floor(100000000 + Math.random() * 900000000),
      paymentMethod: paymentMethod || 'Online Payment Gateway',
      status: 'PAID'
    }
  });
});

module.exports = router;


const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const id = req.body.id;
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: 'this is a charge for 5 emails',
      source: id
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
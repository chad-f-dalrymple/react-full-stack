// module imports
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Survey');
require('./services/passport');

// connect mongoose to mongodb
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

// express middleware
app.use(
  bodyParser.json()
);

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

// cookie stuff
app.use(passport.initialize());
app.use(passport.session());

// routers
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);


if (process.env.NODE_ENV === 'production') {
// express support for client side routes
  app.use(express.static('client/build'));

  // if route isnt recognized
  const path= require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
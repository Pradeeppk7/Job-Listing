const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();

app.get('/health', (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';

  res.status(200).json({
    server: 'Running',
    database: dbStatus,
  });
});

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('MongoDB Connected');
      console.log(`App listening at http://localhost:${process.env.PORT}`);
    })
    .catch((err) => console.log(err));
});

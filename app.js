const express = require('express');
const dotenv = require('dotenv');
const referralRoutes = require('./src/routes/referralRoutes');
const cors = require('cors');


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/referrals', referralRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

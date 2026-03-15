const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // New tool for Database
const app = express();

app.use(cors());
app.use(express.json());

// 1. Connect to the Database
mongoose.connect(process.env.MONGODB_URL);

// 2. Create the "List" format (Schema)
const User = mongoose.model('User', {
    nic: String,
    vehicleNo: String,
    date: { type: Date, default: Date.now }
});

app.post('/api/register', async (req, res) => {
    const { nic, vehicleNo } = req.body;

    // 3. SAVE to the Database
    const newUser = new User({ nic, vehicleNo });
    await newUser.save();

    console.log(`Saved to Database: ${nic}`);
    res.json({ status: "Success", message: "Data Saved Permanently" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);

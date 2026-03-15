const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// --- 1. SETTINGS (THE FOUNDATION) ---
app.use(cors());
app.use(express.json());

// --- 2. DATABASE CONNECTION ---
// This uses the MONGODB_URL variable you set in Railway
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ Database Connection Error:", err));

// --- 3. THE DATA MODEL (THE BLUEPRINT) ---
// This matches the data I saw in your Railway screenshot (nic, vehicleNo)
const User = mongoose.model('User', {
    nic: String,
    vehicleNo: String,
    date: { type: Date, default: Date.now }
});

// --- 4. PUBLIC ROUTE (FOR USERS TO REGISTER) ---
app.post('/api/register', async (req, res) => {
    try {
        const { nic, vehicleNo } = req.body;
        const newUser = new User({ nic, vehicleNo });
        await newUser.save();
        res.json({ status: "Success", message: "Data Saved!" });
    } catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
});

// --- 5. ADMIN ROUTE (THIS IS WHAT YOUR DASHBOARD NEEDS) ---
// This is the "phone number" your admin.html is trying to call
app.get('/api/admin/users', async (req, res) => {
    try {
        const allUsers = await User.find().sort({ date: -1 }); 
        res.json(allUsers); // This sends the list to your dashboard
    } catch (error) {
        res.status(500).json({ error: "Error fetching data" });
    }
});

// --- 6. START THE ENGINE ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Engine running on port ${PORT}`);
});

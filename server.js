const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// --- 1. SETTINGS (THE FOUNDATION) ---
app.use(cors());
app.use(express.json());

// --- 2. DATABASE CONNECTION ---
// Railway will provide the MONGODB_URL in your Variables
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to Government Database"))
    .catch(err => console.error("Database Connection Error:", err));

// --- 3. THE DATA MODEL (THE BLUEPRINT) ---
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
        
        res.json({ 
            status: "Success", 
            message: "දත්ත සාර්ථකව ගබඩා කරන ලදී." 
        });
    } catch (error) {
        res.status(500).json({ message: "Registration failed" });
    }
});

// --- 5. ADMIN ROUTE (THE SECRET DOOR YOU ASKED FOR) ---
// This is where we put the Admin JS logic
app.get('/api/admin/users', async (req, res) => {
    try {
        // This looks into the database and finds everyone
        const allUsers = await User.find().sort({ date: -1 }); 
        res.json(allUsers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching admin data" });
    }
});

// --- 6. START THE ENGINE ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Fuel Pass Engine running on port ${PORT}`);
});

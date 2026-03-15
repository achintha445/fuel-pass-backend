const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // This allows your GitHub site to talk to this Railway site
app.use(express.json());

app.post('/api/register', (req, res) => {
    const { nic, vehicleNo } = req.body;
    
    // This is the "Engine" logic
    console.log(`ලියාපදිංචි කිරීම: ${nic} for ${vehicleNo}`);
    
    res.json({
        status: "Success",
        message: "දත්ත ගබඩා කරන ලදී (Data Saved)",
        quota: 15
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const admin = require('firebase-admin'); // Firebase Admin SD

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// MySQL connection for OTP and CID storage
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'YOUR_PASSWORD', // Set in environment variables
  database: process.env.DB_NAME || 'blockchain' // Database for storing users and OTPs
});

const blockchainDB = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'YOUR_PASSWORD', // Set in environment variables
  database: process.env.DB_NAME || 'blockchain' // Database for storing CIDs
});

// Connect to both databases
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL (fir_lodging):', err);
    return;
  }
  console.log('Connected to MySQL (fir_lodging)');
});

blockchainDB.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL (blockchain):', err);
    return;
  }
  console.log('Connected to MySQL (blockchain)');
});

// Route to store FIR CID into the blockchain MySQL database and Firebase
app.post('/storeCID', (req, res) => {
  const { cid, policeStationName } = req.body;

  if (!cid || !policeStationName) {
    return res.status(400).json({ message: 'CID and Police Station Name are required.' });
  }

  // Insert the CID into the cids table in MySQL
  const newCID = { cid: cid };
  const sql = 'INSERT INTO cids SET ?';
  blockchainDB.query(sql, newCID, (err, result) => {
    if (err) {
      console.error('Error storing CID to MySQL:', err);
      return res.status(500).json({ message: 'Failed to store CID.' });
    }


    // Store the CID and status in Firebase Realtime Database
    const firRef = admin.database().ref('firs').push();
    firRef.set({
      cid: cid,
      status: false,
      police_station: policeStationName,
      timestamp: Date.now() // Using Date.now() to store timestamp
      // Mark the FIR as false (not resolved yet)
    }, (err) => {
      if (err) {
        console.error('Error storing FIR to Firebase:', err);
        return res.status(500).json({ message: 'Failed to store FIR in Firebase.' });
      }
      res.status(200).json({ message: 'CID stored in both blockchain and Firebase successfully.' });
    });
  });
});


app.post('/store-data', async (req, res) => {
  const { cid, policeStationName } = req.body;

  if (!cid || !policeStationName) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    await storeCidStatus(cid, policeStationName);
    res.status(200).json({ message: 'Data stored successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const storeCidStatus = async (cid, policeStationName) => {
  const query = `
    INSERT INTO ${policeStationName} (cid, status)
    VALUES ($1, 'false')
    ON CONFLICT (cid) DO UPDATE
    SET status = EXCLUDED.status, timestamp = NOW();
  `;

  try {
    const client = await pool.connect();
    try {
      await client.query(query, [cid]);
      console.log('Data inserted/updated successfully.');
    } finally {
      client.release(); // Release the client back to the pool
    }
  } catch (err) {
    console.error('Error executing query:', err);
    throw new Error('Failed to store CID and status');
  }
};


// Route to handle OTP sending
app.post('/send-otp', (req, res) => {
  const { mobileNumber } = req.body;

  if (!mobileNumber) {
    return res.status(400).json({ message: 'Mobile number is required.' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save the mobile number and OTP to the database
  const query = 'INSERT INTO users (mobile_number, otp) VALUES (?, ?) ON DUPLICATE KEY UPDATE otp = ?';
  db.query(query, [mobileNumber, otp, otp], (err, results) => {
    if (err) {
      console.error('Error saving OTP to MySQL:', err);
      return res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
    }
    console.log(`OTP sent to ${mobileNumber}: ${otp}`);
    res.status(200).json({ message: 'OTP sent successfully!' });
  });
});

// Route to handle login
app.post('/login', (req, res) => {
  const { username, mobileNumber, otp } = req.body;

  // Validate input
  if (!username || username.length !== 12) {
    return res.status(400).json({ message: 'Aadhaar number must be 12 digits long.' });
  }
  if (!mobileNumber || mobileNumber.length !== 10) {
    return res.status(400).json({ message: 'Mobile number must be 10 digits long.' });
  }
  if (!otp || otp.length !== 6) {
    return res.status(400).json({ message: 'OTP must be 6 digits long.' });
  }

  // Check OTP in the database
  const query = 'SELECT * FROM users WHERE mobile_number = ? AND otp = ?';
  db.query(query, [mobileNumber, otp], (err, results) => {
    if (err) {
      console.error('Error checking OTP in MySQL:', err);
      return res.status(500).json({ message: 'Login failed.' });
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Backend Server is Running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

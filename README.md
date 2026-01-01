# IntegriFIR - Blockchain-Based FIR Lodging System

A secure, transparent, and tamper-proof First Information Report (FIR) filing system built using blockchain technology, ensuring data integrity and citizen trust.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-green.svg)
![React](https://img.shields.io/badge/react-18.x-61DAFB.svg)
![Solidity](https://img.shields.io/badge/solidity-%5E0.8.0-363636.svg)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Smart Contract](#smart-contract)
- [Team](#team)

---

## Overview

**IntegriFIR** is a comprehensive digital FIR lodging system that leverages blockchain technology to ensure:

- **Immutability** - Once an FIR is filed, it cannot be tampered with
- **Transparency** - All stakeholders can verify FIR authenticity
- **Accessibility** - Citizens can file FIRs online from anywhere
- **Accountability** - Complete audit trail of all actions

The system uses **IPFS** for distributed storage of FIR documents and stores the Content Identifiers (CIDs) on the **Ethereum blockchain** for verification.

---

## Features

| Feature | Description |
|---------|-------------|
| **Aadhaar-based Authentication** | Secure login using Aadhaar number with OTP verification |
| **Age Verification** | Face detection-based age estimation to verify eligibility |
| **Online FIR Filing** | Easy-to-use form for filing complaints |
| **Blockchain Storage** | FIR CIDs stored on Ethereum for immutability |
| **FIR Status Tracking** | Real-time tracking of FIR status |
| **AI Chatbot** | Fuzzy-matching chatbot for user assistance |
| **Admin Panel** | Police station dashboard for FIR management |
| **Multi-Station Support** | Support for multiple police stations |

---

## Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation

### Backend
- **Node.js + Express** - Primary API server
- **Flask (Python)** - Chatbot API server
- **MySQL** - Database for user data & OTPs
- **Firebase** - Real-time database for FIR status

### Blockchain
- **Solidity** - Smart contract language
- **Truffle** - Development framework
- **Ganache** - Local blockchain (development)
- **IPFS** - Distributed file storage

---

## Project Structure

```
IntegriFIR/
├── contracts/              # Solidity smart contracts
│   └── FIRSystem.sol       # Main FIR storage contract
│
├── migrations/             # Truffle migration scripts
│   └── 2_deploy_FIR_contract.js
│
├── Frontend/               # React frontend application
│   └── Frontend/
│       ├── src/
│       │   ├── components/ # React components
│       │   │   ├── Login.jsx
│       │   │   ├── SignUp.jsx
│       │   │   ├── RegisterComplaint.jsx
│       │   │   ├── FIRStatus.jsx
│       │   │   ├── AdminPanel.jsx
│       │   │   ├── Bot.jsx
│       │   │   └── ...
│       │   ├── App.jsx
│       │   └── main.jsx
│       └── vite.config.js
│
├── backend1/               # Primary Node.js backend
│   ├── server.js           # Main server (OTP, CID storage)
│   └── server2.js          # Secondary server
│
├── backend2/               # OTP service
│   ├── otp.js
│   └── otp.py
│
├── flask/                  # Python Flask chatbot
│   ├── app.py              # Chatbot API with fuzzy matching
│   ├── templates/
│   └── static/
│
├── test/                   # Smart contract tests
├── truffle-config.js       # Truffle configuration
└── package.json
```

---

## Prerequisites

Before running this project, ensure you have:

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **MySQL** database
- **Truffle** (`npm install -g truffle`)
- **Ganache** (for local blockchain)
- **Firebase** account (for real-time database)

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/HusainRajaa/FIR_Lodging_system.git
cd FIR_Lodging_system/IntegriFIR
```

### 2. Backend Setup (Node.js)

```bash
cd backend1
npm install
```

Configure MySQL connection in `server.js`:
```javascript
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'YOUR_PASSWORD',
  database: 'blockchain'
});
```

### 3. Flask Chatbot Setup

```bash
cd flask
pip install flask fuzzywuzzy flask-cors python-Levenshtein
```

### 4. Frontend Setup

```bash
cd Frontend/Frontend
npm install
```

### 5. Smart Contract Deployment

```bash
# Start Ganache first
truffle compile
truffle migrate --network development
```

### 6. Firebase Configuration

Update `Frontend/Frontend/src/components/fireBase.jsx` with your Firebase config:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  // ... other config
};
```

### 7. Database Setup

Create MySQL database and tables:
```sql
CREATE DATABASE blockchain;
USE blockchain;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mobile_number VARCHAR(10) UNIQUE,
  otp VARCHAR(6)
);

CREATE TABLE cids (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cid VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Running the Application

### Start all services:

**Terminal 1 - Backend Server:**
```bash
cd backend1
node server.js
# Server runs on http://localhost:5000
```

**Terminal 2 - Flask Chatbot:**
```bash
cd flask
python app.py
# Chatbot runs on http://localhost:5001
```

**Terminal 3 - Frontend:**
```bash
cd Frontend/Frontend
npm run dev
# Frontend runs on http://localhost:5173
```

---

## API Endpoints

### Node.js Backend (`localhost:5000`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/send-otp` | Send OTP to mobile number |
| POST | `/login` | Verify login with Aadhaar, mobile & OTP |
| POST | `/storeCID` | Store FIR CID to blockchain & Firebase |
| GET | `/` | Health check |

### Flask Chatbot (`localhost:5001`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/get-response` | Get chatbot response using fuzzy matching |
| GET | `/` | Serve chatbot interface |

---

## Smart Contract

The `FIRSystem.sol` contract provides:

```solidity
// Store a new FIR CID
function storeCID(string memory cid) public

// Retrieve all stored CIDs
function getAllCIDs() public view returns (string[] memory)
```

**Events:**
- `CIDStored(string cid)` - Emitted when a new CID is stored

---

## Team

Built for **Smart India Hackathon 2024**

---

## License

This project is licensed under the MIT License.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<p align="center">
  <b>IntegriFIR</b> - Securing Justice Through Technology
</p>

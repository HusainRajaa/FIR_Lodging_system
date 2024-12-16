import React, { useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = ({ user }) => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [cids, setCIDs] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== 'admin123') {
      setErrorMessage('Incorrect password');
      return;
    }

    setErrorMessage('');
    setIsLoggedIn(true);
  };

  // Function to toggle user list visibility and fetch CIDs from MySQL
  const toggleUserList = async () => {
    setShowUsers(!showUsers);

    if (!showUsers) {
      try {
        const response = await axios.get('http://localhost:3000/api/cids');
        setCIDs(response.data);
      } catch (error) {
        console.error('Error fetching CIDs from the database:', error);
      }
    }
  };

  // Function to download the PDF from IPFS
  const downloadPDF = async (cid) => {
    const ipfsURL = `https://gateway.pinata.cloud/ipfs/${cid}`;
    try {
      const response = await axios.get(ipfsURL, { responseType: 'blob' });
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'FIR_Complaint.pdf';
      link.click();

      URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.error('Error downloading PDF from IPFS:', error);
    }
  };

  if (user?.role !== 'admin') {
    return null; 
  }

  return (
    <div className="admin-panel">
      {isLoggedIn ? (
        <div className="admin-content">
          <h2>Admin Panel</h2>
          <h3>Stored FIR CIDs</h3>
          <button onClick={toggleUserList}>
            {showUsers ? 'Hide CIDs' : 'Show CIDs'}
          </button>
          {showUsers && (
            <ul className="cid-list">
              {cids.length === 0 ? (
                <p>No CIDs available.</p>
              ) : (
                cids.map((cid, index) => (
                  <li key={index}>
                    <button onClick={() => downloadPDF(cid)}>{cid}</button>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      ) : (
        <div className="admin-access">
          <h2>Admin Panel </h2>
          <form onSubmit={handleSubmit}>
            <table className="form-table">
              <tbody>
                <tr>
                  
                  <td>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

import React, { useState } from 'react';
import './FIRStatus.css';

const AdminStatus = () => {
  const [cid, setCid] = useState('');
  const [submittedCids, setSubmittedCids] = useState([]);
  const [trackingProgress, setTrackingProgress] = useState({});
  const [selectedCid, setSelectedCid] = useState(null);

  const steps = [
    'FIR Registered',
    'Assigned to Officer',
    'Investigation',
    'Case Closed',
  ];

  const handleChange = (event) => {
    setCid(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cid) {
      setSubmittedCids([...submittedCids, cid]);
      setTrackingProgress({
        ...trackingProgress,
        [cid]: 0, // Initialize tracking progress for the new CID
      });
      setCid('');
    }
  };

  const handleTrackClick = (cidToTrack) => {
    setSelectedCid(cidToTrack);
   
    
    const delayTime = 60 * 60 * 1000; // 1 hour in milliseconds
    
    setTrackingProgress((prevProgress) => {
      const currentStep = prevProgress[cidToTrack] || 0; // Default to step 0 if undefined
      const nextStep = currentStep < steps.length - 1 ? currentStep + 1 : currentStep;

      // Use setTimeout to simulate a delay for advancing the step
      setTimeout(() => {
        setTrackingProgress((prev) => ({
          ...prev,
          [cidToTrack]: nextStep, // Update progress for the CID after 2 hours
        }));
      }, delayTime); // 2 hours delay
      return prevProgress;
    });
  };

  return (
    <div className="admin-status-container">
      <h2 className="status-title">FIR Status</h2>
      <form onSubmit={handleSubmit} className="cid-form">
        <label htmlFor="cid" className="cid-label">Enter CID:</label>
        <input
          type="text"
          id="cid"
          value={cid}
          onChange={handleChange}
          placeholder="Enter CID"
          className="cid-input"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>

      {submittedCids.length > 0 && (
        <div className="submitted-cids-table">
          <h3>Submitted CIDs:</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>CID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {submittedCids.map((cidItem, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{cidItem}</td>
                  <td>
                    <button
                      className="track-button"
                      onClick={() => handleTrackClick(cidItem)}
                    >
                      Track
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedCid && (
        <div className="fir-tracking-arrows">
          <h3>Tracking Progress for CID: {selectedCid}</h3>
          <div className="tracking-arrows-container">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div
                  className={`step ${
                    trackingProgress[selectedCid] >= index ? 'completed' : ''
                  }`}
                >
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </div>
                {index < steps.length - 1 && <div className="arrow">&rarr;</div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStatus;
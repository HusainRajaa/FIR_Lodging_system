// import React, { useState } from 'react';
// import './Login.css';

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [showSendOtp, setShowSendOtp] = useState(false);

//   const handleMobileNumberChange = (e) => {
//     const value = e.target.value;
//     setMobileNumber(value);

//     // Show the "Send OTP" button only if the mobile number is 10 digits long
//     if (value.length === 10) {
//       setShowSendOtp(true);
//     } else {
//       setShowSendOtp(false);
//     }
//   };

//   const handleSendOtp = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/send-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ mobileNumber }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert(`OTP sent to ${mobileNumber}`);
//       } else {
//         setError(data.message);
//       }
//     } catch (error) {
//       setError('Failed to send OTP. Please try again.');
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (username.length !== 12) {
//       setError('Aadhaar number must be 12 digits long.');
//       return;
//     }
//     if (mobileNumber.length !== 10) {
//       setError('Mobile number must be 10 digits long.');
//       return;
//     }
//     if (otp.length !== 6) {
//       setError('OTP must be 6 digits long.');
//       return;
//     }

//     setError('');

//     try {
//       const response = await fetch('http://localhost:5000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, mobileNumber, otp }),
//       });

//       const data = await response.json();
//       if (response.ok) {
        
//         onLogin(); 
//       } else {
//         setError(data.message);
//       }
//     } catch (error) {
//       setError('Login failed. Please try again.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Connect</h2>
//       <form onSubmit={handleLogin}>
//         <div className="form-group">
//           <label>Aadhaar Number:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             maxLength="12"
//           />
//         </div>
//         <div className="form-group">
//           <label>Mobile Number:</label>
//           <input
//             type="text"
//             value={mobileNumber}
//             onChange={handleMobileNumberChange}
//             maxLength="10"
//           />
//           {showSendOtp && (
//             <button type="button" className="send-otp-button" onClick={handleSendOtp}>
//               Send OTP
//             </button>
//           )}
//         </div>
//         <div className="form-group">
//           <label>OTP:</label>
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             maxLength="6"
//           />
//         </div>
//         {error && <p className="error">{error}</p>}
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;



// import React, { useState } from 'react';
// import { auth } from './fireBase'; // Import Firebase configuration
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// import './Login.css'; // Assuming you have styles here

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState(''); // Aadhaar Number
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [showSendOtp, setShowSendOtp] = useState(false);
//   const [confirmationResult, setConfirmationResult] = useState(null);

//   // Handle mobile number input change
//   const handleMobileNumberChange = (e) => {
//     const value = e.target.value;
//     setMobileNumber(value);

//     if (value.length === 10) {
//       setShowSendOtp(true); // Show Send OTP button only if the number has 10 digits
//     } else {
//       setShowSendOtp(false);
//     }
//   };

//   // Function to send OTP
//   const handleSendOtp = (e) => {
//     e.preventDefault();
  
//     if (mobileNumber.length !== 10) {
//       setError('Please enter a valid 10-digit mobile number.');
//       return;
//     }
  
//     const phoneNumber = `+91${mobileNumber}`; // Adjust for your country code
  
//     try {
//       if (!window.recaptchaVerifier) {
//         window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
//           size: 'invisible',
//           callback: (response) => {
//             // reCAPTCHA solved
//           },
//           'expired-callback': () => {
//             setError('ReCAPTCHA expired, please try again.');
//           }
//         }, auth);
//       }
  
//       const appVerifier = window.recaptchaVerifier;
  
//       // Send OTP using Firebase auth
//       signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//         .then((result) => {
//           setConfirmationResult(result);
//           alert('OTP sent successfully!');
//         })
//         .catch((error) => {
//           setError(`Error sending OTP: ${error.message}`);
//         });
//     } catch (error) {
//       setError(`ReCAPTCHA error: ${error.message}`);
//     }
//   };
  

//   // Function to verify OTP
//   const handleVerifyOtp = (e) => {
//     e.preventDefault();

//     if (!confirmationResult) {
//       setError('Please send OTP first.');
//       return;
//     }

//     confirmationResult.confirm(otp)
//       .then(() => {
//         // OTP verification successful
//         onLogin(); // Callback to navigate or update state after successful login
//       })
//       .catch((error) => {
//         setError(`Invalid OTP: ${error.message}`);
//       });
//   };

//   return (
//     <div className="login-container">
//       <h2>Connect</h2>
//       <form>
//         <div className="form-group">
//           <label>Aadhaar Number:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             maxLength="12"
//             placeholder="Enter Aadhaar Number"
//           />
//         </div>

//         <div className="form-group">
//           <label>Mobile Number:</label>
//           <input
//             type="text"
//             value={mobileNumber}
//             onChange={handleMobileNumberChange}
//             maxLength="10"
//             placeholder="Enter 10-digit mobile number"
//           />
//           {showSendOtp && (
//             <>
//               <button type="button" className="send-otp-button" onClick={handleSendOtp}>
//                 Send OTP
//               </button>
//               <div id="recaptcha-container"></div> {/* Required for reCAPTCHA */}
//             </>
//           )}
//         </div>

//         <div className="form-group">
//           <label>OTP:</label>
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             maxLength="6"
//             placeholder="Enter OTP"
//           />
//         </div>

//         {error && <p className="error">{error}</p>} {/* Display errors if any */}

//         <button type="submit" onClick={handleVerifyOtp}>Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;



// import React, { useState } from 'react';
// import './Login.css';

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [showSendOtp, setShowSendOtp] = useState(false);

//   const handleMobileNumberChange = (e) => {
//     const value = e.target.value;
//     setMobileNumber(value);

//     // Show the "Send OTP" button only if the mobile number is 10 digits long
//     if (value.length === 10) {
//       setShowSendOtp(true);
//     } else {
//       setShowSendOtp(false);
//     }
//   };

//   const handleSendOtp = () => {
//     // Simulate sending OTP
//     alert(`OTP sent to ${mobileNumber}`);
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (username.length !== 12) {
//       setError('Aadhaar number must be 12 digits long.');
//       return;
//     }
//     if (mobileNumber.length !== 10) {
//       setError('Mobile number must be 10 digits long.');
//       return;
//     }
//     if (otp.length !== 6) {
//       setError('OTP must be 6 digits long.');
//       return;
//     }

//     setError('');
//     // Simulate successful login
//     alert('Login successful!');
//     onLogin(); // Optionally trigger login success callback
//   };

//   return (
//     <div className="login-container">
//       <h2>Connect</h2>
//       <form onSubmit={handleLogin}>
//         <div className="form-group">
//           <label>Aadhaar Number:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             maxLength="12"
//           />
//         </div>
//         <div className="form-group">
//           <label>Mobile Number:</label>
//           <input
//             type="text"
//             value={mobileNumber}
//             onChange={handleMobileNumberChange}
//             maxLength="10"
//           />
//           {showSendOtp && (
//             <button type="button" className="send-otp-button" onClick={handleSendOtp}>
//               Send OTP
//             </button>
//           )}
//         </div>
//         <div className="form-group">
//           <label>OTP:</label>
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             maxLength="6"
//           />
//         </div>
//         {error && <p className="error">{error}</p>}
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// ---------------------


// import React, { useState } from 'react';
// import './Login.css';

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [showSendOtp, setShowSendOtp] = useState(false);

//   const handleMobileNumberChange = (e) => {
//     const value = e.target.value;
//     setMobileNumber(value);

//     if (value.length === 10) {
//       setShowSendOtp(true);
//     } else {
//       setShowSendOtp(false);
//     }
//   };

//   const handleSendOtp = () => {
//     const formattedNumber = `+91${mobileNumber}`;

//     fetch('http://localhost:5000/send-otp', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ toPhoneNumber: formattedNumber }),
//     })
//     .then(response => {
//       if (!response.ok) {
//         return response.json().then(errorData => {
//           throw new Error(errorData.error || 'Failed to send OTP');
//         });
//       }
//       return response.json();
//     })
//     .then(data => {
//       alert(data.message); // Show success message
//     })
//     .catch(error => {
//       setError(error.message); // Show error message in the UI
//     });
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (username.length !== 12) {
//       setError('Aadhaar number must be 12 digits long.');
//       return;
//     }
//     if (mobileNumber.length !== 10) {
//       setError('Mobile number must be 10 digits long.');
//       return;
//     }
//     if (otp.length !== 6) {
//       setError('OTP must be 6 digits long.');
//       return;
//     }

//     setError('');
//     // alert('Login successful!');
//     onLogin(); // Trigger login success callback
//   };

//   return (
//     <div className="login-container">
//       <h2>Connect</h2>
//       <form onSubmit={handleLogin}>
//         <div className="form-group">
//           <label>Aadhaar Number:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             maxLength="12"
//           />
//         </div>
//         <div className="form-group">
//           <label>Mobile Number:</label>
//           <input
//             type="text"
//             value={mobileNumber}
//             onChange={handleMobileNumberChange}
//             maxLength="10"
//           />
//           {showSendOtp && (
//             <button type="button" className="send-otp-button" onClick={handleSendOtp}>
//               Send OTP
//             </button>
//           )}
//         </div>
//         <div className="form-group">
//           <label>OTP:</label>
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             maxLength="6"
//           />
//         </div>
//         {error && <p className="error">{error}</p>}
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
// -----------------------------


import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');  // Aadhaar number
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [showSendOtp, setShowSendOtp] = useState(false);

  // Fetch mobile number based on Aadhaar number
  const fetchMobileNumber = (aadhaarNumber) => {
    fetch('http://localhost:5000/fetch-mobile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ aadhaar_number: aadhaarNumber }), // Send Aadhaar number to the backend
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.error || 'Failed to fetch mobile number');
          });
        }
        return response.json();
      })
      .then(data => {
        setMobileNumber(data.mobile_number);  // Populate mobile number field
        setShowSendOtp(true);  // Show "Send OTP" button when mobile is fetched
      })
      .catch(error => {
        setError(error.message);  // Handle error (e.g., Aadhaar not found)
        setMobileNumber('');  // Clear mobile number field if error
        setShowSendOtp(false);
      });
  };

  const handleUsernameChange = (e) => {
    const aadhaarNumber = e.target.value;
    setUsername(aadhaarNumber);

    if (aadhaarNumber.length === 12) {
      fetchMobileNumber(aadhaarNumber);  // Fetch the mobile number when Aadhaar is fully entered
    }
  };
  const handleSendOtp = () => {
    if (!username || username.length !== 12) {
      setError('Aadhaar number is required and must be 12 digits long.');
      return;
    }
  
    const formattedNumber = `+91${mobileNumber}`;
  
    fetch('http://localhost:5000/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        aadhaarNumber: username,  // Include Aadhaar number
        toPhoneNumber: formattedNumber 
      }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.error || 'Failed to send OTP');
          });
        }
        return response.json();
      })
      .then(data => {
        alert(data.message);  // Show success message
      })
      .catch(error => {
        setError(error.message);  // Show error message in the UI
      });
  };
  

  const handleLogin = (e) => {
    e.preventDefault();

    if (username.length !== 12) {
      setError('Aadhaar number must be 12 digits long.');
      return;
    }
    if (mobileNumber.length !== 10) {
      setError('Mobile number must be 10 digits long.');
      return;
    }
    if (otp.length !== 6) {
      setError('OTP must be 6 digits long.');
      return;
    }

    setError('');
    onLogin();  // Trigger login success callback
  };

  return (
    <div className="login-container">
      <h2>Connect</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Aadhaar Number:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}  // Use updated handler
            maxLength="12"
          />
        </div>
        <div className="form-group">
          
          {showSendOtp && (
            <button type="button" className="send-otp-button" onClick={handleSendOtp}>
              Send OTP
            </button>
          )}
        </div>
        <div className="form-group">
          <label>OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';

// const SmsSender = () => {
//     const [mobileNumber, setMobileNumber] = useState('');
//     const [responseMessage, setResponseMessage] = useState('');

//     const handleSendSms = async () => {
//         try {
//             const response = await axios.post('http://localhost:5000/send-sms', { mobileNumber });
//             setResponseMessage(response.data.message);
//         } catch (error) {
//             setResponseMessage(error.response?.data?.message || 'Error sending message');
//         }
//     };

//     return (
//         <div>
//             <h2>Send SMS</h2>
//             <input 
//                 type="text" 
//                 placeholder="Enter mobile number (91XXXXXXXXXX)"
//                 value={mobileNumber}
//                 onChange={(e) => setMobileNumber(e.target.value)}
//             />
//             <button onClick={handleSendSms}>Send SMS</button>
//             {responseMessage && <p>{responseMessage}</p>}
//         </div>
//     );
// };

// export default SmsSender;

// import React, { useState } from 'react';
// import './SignUp.css';

// const SignUp = ({ onSignUpSuccess }) => {
//   const [username, setUsername] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [password, setPassword] = useState('');
//   const [step, setStep] = useState(1);
//   const [error, setError] = useState('');

//   const handleSignUp = (e) => {
//     e.preventDefault();

//     if (step === 1) {
//       if (username.length !== 12) {
//         setError('Aadhaar number must be 12 digits long.');
//         return;
//       }
//       if (mobileNumber.length !== 10) {
//         setError('Mobile number must be 10 digits long.');
//         return;
//       }
//       if (otp.length !== 6) {
//         setError('OTP must be 6 digits long.');
//         return;
//       }
      
//       setError('');
//       setStep(2);
//     } else if (step === 2) {
//       if (password.length < 6) {
//         setError('Password must be at least 6 characters long.');
//         return;
//       }

//       setError('');
//       // Pass user details to the parent component
//       onSignUpSuccess({ username, mobileNumber, password });
//     }
//   };

//   return (
//     <div className="signup-container">
//       <h2>{step === 1 ? 'Sign Up' : 'Set Password'}</h2>
//       <form onSubmit={handleSignUp}>
//         {step === 1 ? (
//           <>
//             <div className="form-group">
//               <label>Aadhaar Number:</label>
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 maxLength="12"
//               />
//             </div>
//             <div className="form-group">
//               <label>Mobile Number:</label>
//               <input
//                 type="text"
//                 value={mobileNumber}
//                 onChange={(e) => setMobileNumber(e.target.value)}
//                 maxLength="10"
//               />
//             </div>
//             <div className="form-group">
//               <label>OTP:</label>
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 maxLength="6"
//               />
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="form-group">
//               <label>New Password:</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 minLength="6"
//               />
//             </div>
//           </>
//         )}
//         {error && <p className="error">{error}</p>}
//         <button type="submit">
//           {step === 1 ? 'Next' : 'Set Password'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignUp;
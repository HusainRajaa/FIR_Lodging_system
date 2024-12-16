
// import React from 'react';
// import './Navbar.css';

// const Navbar = ({ isLoggedIn, onNavigate }) => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <h1 className="navbar-title">IntegriFIR</h1>
//         <ul className="nav-links">
//           <li><button onClick={() => onNavigate('home')}>Home</button></li>
//           <li><button onClick={() => onNavigate('about')}>About</button></li>
//           <li><button onClick={() => onNavigate('contact')}>Contact</button></li>
//           {!isLoggedIn && (
//             <li>
//               <button onClick={() => onNavigate('login')} className="login-link">
//                 Login
//               </button>
//             </li>
//           )}
//           {isLoggedIn && (
//             <li>
//               <button onClick={() => onNavigate('register-complaint')} className="register-link">
//                 Register Complaint
//               </button>
//             </li>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from 'react';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onNavigate }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">IntegriFIR</h1>
        <ul className="nav-links">
          <li><button onClick={() => onNavigate('home')}>Home</button></li>
          <li><button onClick={() => onNavigate('about')}>About</button></li>
          <li><button onClick={() => onNavigate('contact')}>Contact</button></li>



              <li>
                <button onClick={() => onNavigate('admin-status')} className="admin-link">
                  FIR Status
                </button>
              </li>
          {!isLoggedIn && (
            <li>
              <button onClick={() => onNavigate('login')} className="login-link">
                Login
              </button>
            </li>
          )}
          {isLoggedIn && (
            <>
              <li>
                <button onClick={() => onNavigate('register-complaint')} className="register-link">
                  Register Complaint
                </button>
              </li>
             
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
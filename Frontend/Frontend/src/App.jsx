// import React, { useState } from 'react';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Login from './components/Login';
// import LawsDisplay from './components/LawsDisplay';
// import RegisterComplaint from './components/RegisterComplaint';
// import ComplaintConfirmation from './components/ComplaintConfirmation';
// import AdminPanel from './components/AdminPanel';
// import About from './components/About';
// import Contact from './components/Contact';
// import Bot from './components/Bot'; // Import the Bot component
// import ChatbotButton from './components/ChatbotButton'; // Import the ChatbotButton component

// import './App.css';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLaws, setShowLaws] = useState(true);
//   const [currentPage, setCurrentPage] = useState('main');
//   const [isBotVisible, setIsBotVisible] = useState(false); // State to control chatbot visibility

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//     setCurrentPage('register-complaint'); 
//   };

//   const handleNavigate = (page) => {
//     setCurrentPage(page); 
//   };

//   const handleComplaintSubmit = (formData) => {
//     setCurrentPage('complaint-confirmation'); 
//   };

//   const handleEditComplaint = () => {
//     setCurrentPage('register-complaint');
//   };

//   const toggleBot = () => {
//     setIsBotVisible(!isBotVisible); // Toggle chatbot visibility
//   };

//   return (
//     <div className="app">
//       <Navbar isLoggedIn={isLoggedIn} onNavigate={handleNavigate} />
//       {showLaws && <LawsDisplay />}
//       <main>
//         {currentPage === 'login' && !isLoggedIn ? (
//           <Login onLogin={handleLogin} />
//         ) : currentPage === 'register-complaint' ? (
//           <RegisterComplaint onSubmit={handleComplaintSubmit} />
//         ) : currentPage === 'complaint-confirmation' ? (
//           <ComplaintConfirmation />
//         ) : currentPage === 'contact' ? (
//           <Contact />  
//         ) : currentPage === 'about' ? (
//           <About />  
//         ) : currentPage === 'admin-panel' ? (
//           <AdminPanel user={{ role: 'admin' }} /> 
//         ) : (
//           <div className="content">
//             <h1>About IntegriFIR / प्रणाली विवरण</h1>
//             <p>IntegriFIR is a customized portal of Nagpur Police (Maharashtra Police) with an aim to resolve grievance complaints...</p>
//             <p>प्रणाली शिकायत शिकायतों को हल करने के उद्देश्य से नागपुर पुलिस (महाराष्ट्र पुलिस) का एक अनुकूलित पोर्टल है...</p>
//             <ul>
//               <li>Grievance can be lodged by any individual. / शिकायत कोई भी व्यक्ति दर्ज करा सकता है</li>
//               <li>ReCaptcha verification. / रीकैप्चा सत्यापन</li>
//               <li>Online lodging of grievance. / शिकायत का ऑनलाइन दर्ज करना</li>
//               <li>Dedicated officer validation of the grievance. / समर्पित अधिकारी शिकायत का सत्यापन</li>
//               <li>Facility to send reminder for pending grievance. / लंबित शिकायतों के लिए रिमाइंडर भेजने की सुविधा</li>
//               <li>Token number generation for further status inquiry. / आगे की स्थिति की पूछताछ के लिए टोकन नंबर जनरेशन</li>
//               <li>View current status of grievance / शिकायत की वर्तमान स्थिति देखें</li>
//               <li>Village based categorization of grievance. / शिकायत का ग्राम आधारित वर्गीकरण</li>
//               <li>Facility to upload one grievance document. / एक शिकायत दस्तावेज अपलोड करने की सुविधा</li>
//             </ul>
          
//             <p>Further, once a grievance is registered, system generates a unique token number and auto generates acknowledgement through SMS & email. There is ease of registration of grievance and faster settlement after revamp.</p>
//             <p>इसके अलावा, एक बार शिकायत दर्ज होने के बाद, सिस्टम एक अद्वितीय टोकन नंबर उत्पन्न करता है और एसएमएस और ईमेल के माध्यम से ऑटो पावती उत्पन्न करता है। शिकायत के पंजीकरण में आसानी होती है और सुधार के बाद तेजी से निपटारा होता है।</p>
//             <p>"Nagpur Police is working hard to improve the service delivery. Kindly give your valuable feedback with respect to registering your grievance on the IntegriFIR Portal and your feedback regarding your satisfaction with respect to resolution of your grievance".</p>
//             <p>"नागपुर पुलिस सेवा वितरण में सुधार के लिए कड़ी मेहनत कर रही है। कृपया IntegriFIR पोर्टल पर अपनी शिकायत दर्ज करने के संबंध में अपनी बहुमूल्य प्रतिक्रिया दें और अपनी शिकायत के समाधान के संबंध में अपनी संतुष्टि के संबंध में अपनी प्रतिक्रिया दें।"</p>
            
//           </div>
//         )}
//       </main>
//       <Footer onAdminPanelClick={() => handleNavigate('admin-panel')} />
//       <ChatbotButton onToggleBot={toggleBot} />
//       {isBotVisible && <Bot onClose={toggleBot} />} {/* Chatbot appears based on state */}
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import LawsDisplay from './components/LawsDisplay';
import RegisterComplaint from './components/RegisterComplaint';
import ComplaintConfirmation from './components/ComplaintConfirmation';
import AdminPanel from './components/AdminPanel';
import About from './components/About';
import Contact from './components/Contact';
import Bot from './components/Bot'; // Import the Bot component
import AdminStatus from './components/FIRStatus'; // Import AdminStatus component
import ChatbotButton from './components/ChatbotButton'; // Import the ChatbotButton component

import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLaws, setShowLaws] = useState(true);
  const [currentPage, setCurrentPage] = useState('main');
  const [isBotVisible, setIsBotVisible] = useState(false); // State to control chatbot visibility

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('register-complaint'); 
  };

  const handleNavigate = (page) => {
    setCurrentPage(page); 
  };

  const handleComplaintSubmit = (formData) => {
    setCurrentPage('complaint-confirmation'); 
  };

  const handleEditComplaint = (formData) => {
    setCurrentPage('register-complaint');
  };

  const toggleBot = () => {
    setIsBotVisible(!isBotVisible); // Toggle chatbot visibility
  };

  return (
    <div className="app">
      <Navbar isLoggedIn={isLoggedIn} onNavigate={handleNavigate} />
      {showLaws && <LawsDisplay />}
      <main>
        {currentPage === 'login' && !isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : currentPage === 'register-complaint' ? (
          <RegisterComplaint onSubmit={handleComplaintSubmit} />
        ) : currentPage === 'complaint-confirmation' ? (
          <ComplaintConfirmation onEdit={handleEditComplaint} />
        ) : currentPage === 'contact' ? (
          <Contact />  
        ) : currentPage === 'about' ? (
          <About />  
        ) : currentPage === 'admin-panel' ? (
          <AdminPanel user={{ role: 'admin' }} /> 
        ) : currentPage === 'admin-status' ? (  // Renders AdminStatus when clicked
          <AdminStatus />
        ) : (
          <div className="content">
            <h1>About IntegriFIR / प्रणाली विवरण</h1>
            <p>IntegriFIR is a customized portal of Nagpur Police (Maharashtra Police) with an aim to resolve grievance complaints...</p>
            <p>प्रणाली शिकायत शिकायतों को हल करने के उद्देश्य से नागपुर पुलिस (महाराष्ट्र पुलिस) का एक अनुकूलित पोर्टल है...</p>
            <ul>
              <li>Grievance can be lodged by any individual. / शिकायत कोई भी व्यक्ति दर्ज करा सकता है</li>
              <li>ReCaptcha verification. / रीकैप्चा सत्यापन</li>
              <li>Online lodging of grievance. / शिकायत का ऑनलाइन दर्ज करना</li>
              <li>Dedicated officer validation of the grievance. / समर्पित अधिकारी शिकायत का सत्यापन</li>
              <li>Facility to send reminder for pending grievance. / लंबित शिकायतों के लिए रिमाइंडर भेजने की सुविधा</li>
              <li>Token number generation for further status inquiry. / आगे की स्थिति की पूछताछ के लिए टोकन नंबर जनरेशन</li>
              <li>View current status of grievance / शिकायत की वर्तमान स्थिति देखें</li>
              <li>Village based categorization of grievance. / शिकायत का ग्राम आधारित वर्गीकरण</li>
              <li>Facility to upload one grievance document. / एक शिकायत दस्तावेज अपलोड करने की सुविधा</li>
            </ul>
          
            <p>Further, once a grievance is registered, system generates a unique token number and auto generates acknowledgement through SMS & email. There is ease of registration of grievance and faster settlement after revamp.</p>
            <p>इसके अलावा, एक बार शिकायत दर्ज होने के बाद, सिस्टम एक अद्वितीय टोकन नंबर उत्पन्न करता है और एसएमएस और ईमेल के माध्यम से ऑटो पावती उत्पन्न करता है। शिकायत के पंजीकरण में आसानी होती है और सुधार के बाद तेजी से निपटारा होता है।</p>
            <p>"Nagpur Police is working hard to improve the service delivery. Kindly give your valuable feedback with respect to registering your grievance on the IntegriFIR Portal and your feedback regarding your satisfaction with respect to resolution of your grievance".</p>
            <p>"नागपुर पुलिस सेवा वितरण में सुधार के लिए कड़ी मेहनत कर रही है। कृपया IntegriFIR पोर्टल पर अपनी शिकायत दर्ज करने के संबंध में अपनी बहुमूल्य प्रतिक्रिया दें और अपनी शिकायत के समाधान के संबंध में अपनी संतुष्टि के संबंध में अपनी प्रतिक्रिया दें।"</p>
            
          </div>
        )}
      </main>
      <Footer onAdminPanelClick={() => handleNavigate('admin-panel')} />
      <ChatbotButton onToggleBot={toggleBot} />
      {isBotVisible && <Bot onClose={toggleBot} />} {/* Chatbot appears based on state */}
    </div>
  );
};

export default App;
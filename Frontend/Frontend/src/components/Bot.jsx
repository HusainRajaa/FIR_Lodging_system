// import React, { useState } from 'react';
// import './Bot.css';

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const Bot = ({ onClose }) => {
//   const [userInput, setUserInput] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const genAI = new GoogleGenerativeAI("AIzaSyBehYOxsVRypoKz4aWh8fMVL5Zb-jt0Lu4");
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const handleUserInput = (e) => {
//     setUserInput(e.target.value);
//   };

//   const formatResponse = (responseText) => {
//     // Split the response into lines for pointwise display
//     const points = responseText.split(/\n+/); // Split based on newlines or point indicators
    
//     // Filter out any empty strings and return as list items
//     return points.filter(point => point.trim() !== "").map(point => `• ${point.trim()}`);
//   };

//   const sendMessage = async () => {
//     if (userInput.trim() === "") return; // Prevent sending empty messages

//     setIsLoading(true);

//     try {
//       const result = await model.generateContent(userInput);
//       const response = await result.response;

//       // Format response to ensure pointwise clarity
//       const formattedResponse = formatResponse(response.text());

//       setChatHistory((prevChatHistory) => [
//         ...prevChatHistory,
//         { type: "user", message: userInput }, 
//         { type: "bot", message: formattedResponse.join("\n") }, // Add the formatted response
//       ]);
//     } catch (error) {
//       console.error("Error sending message:", error); // Handle errors
//     } finally {
//       setUserInput("");
//       setIsLoading(false); // Reset input and loading state
//     }
//   };

//   return (
//     <div className="chat-container">
//       <button className="close-btn" onClick={onClose}>X</button> {/* Close the chatbot */}
//       <div className="chat-history">
//         {chatHistory.map((chat, index) => (
//           <div key={index} className={chat.type === "user" ? "user-message" : "bot-message"}>
//             <strong>{chat.type === "user" ? "You: " : "Bot: "}</strong>
//             {chat.message.split("\n").map((line, i) => (
//               <div key={i}>{line}</div> // Display each point in a new line
//             ))}
//           </div>
//         ))}
//       </div>
//       <div className="input-container">
//         <input
//           type="text"
//           value={userInput}
//           onChange={handleUserInput}
//           placeholder="Ask me anything..."
//           disabled={isLoading}
//         />
//         <button onClick={sendMessage} disabled={isLoading}>
//           {isLoading ? "Loading..." : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Bot;



// import React, { useState } from 'react';
// import './Bot.css';

// const Bot = ({ onClose }) => {
//   const [userInput, setUserInput] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleUserInput = (e) => {
//     setUserInput(e.target.value);
//   };

//   const sendMessage = async () => {
//     if (userInput.trim() === "") return; // Prevent sending empty messages

//     setIsLoading(true);

//     try {
//       // Send user input to Flask backend
//       const response = await fetch('http://127.0.0.1:5000/get-response', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message: userInput }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch response from server');
//       }

//       const data = await response.json();

//       setChatHistory((prevChatHistory) => [
//         ...prevChatHistory,
//         { type: "user", message: userInput },
//         { type: "bot", message: data.response },
//       ]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setChatHistory((prevChatHistory) => [
//         ...prevChatHistory,
//         { type: "user", message: userInput },
//         { type: "bot", message: "Sorry, something went wrong. Please try again." },
//       ]);
//     } finally {
//       setUserInput("");
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <button className="close-btn" onClick={onClose}>X</button> {/* Close the chatbot */}
//       <div className="chat-history">
//         {chatHistory.map((chat, index) => (
//           <div key={index} className={chat.type === "user" ? "user-message" : "bot-message"}>
//             <strong>{chat.type === "user" ? "You: " : "Bot: "}</strong>
//             {chat.message.split("\n").map((line, i) => (
//               <div key={i}>{line}</div> // Display each point in a new line
//             ))}
//           </div>
//         ))}
//       </div>
//       <div className="input-container">
//         <input
//           type="text"
//           value={userInput}
//           onChange={handleUserInput}
//           placeholder="Ask me anything..."
//           disabled={isLoading}
//         />
//         <button onClick={sendMessage} disabled={isLoading}>
//           {isLoading ? "Loading..." : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Bot;


import React, { useState } from 'react';
import './Bot.css';

const Bot = ({ onClose }) => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return; // Prevent sending empty messages

    setIsLoading(true);

    try {
      // Send user input to Flask backend
      const response = await fetch('http://127.0.0.1:5001/get-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from server');
      }

      const data = await response.json();

      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: data.response },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <button className="close-btn" onClick={onClose}>X</button> {/* Close the chatbot */}
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div key={index} className={chat.type === "user" ? "user-message" : "bot-message"}>
            <strong>{chat.type === "user" ? "You: " : "Bot: "}</strong>
            {chat.message.split("\n").map((line, i) => (
              <div key={i}>{line}</div> // Display each point in a new line
            ))}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Ask me anything..."
          disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Bot;

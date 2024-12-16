// import React, { useState } from 'react';
// import jsPDF from 'jspdf';
// import axios from 'axios';
// import Web3 from 'web3';
// import './ComplaintConfirmation.css'; 


// const FIRContractABI = [
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": false,
//         "internalType": "string",
//         "name": "cid",
//         "type": "string"
//       }
//     ],
//     "name": "CIDStored",
//     "type": "event"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "cid",
//         "type": "string"
//       }
//     ],
//     "name": "storeCID",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "getAllCIDs",
//     "outputs": [
//       {
//         "internalType": "string[]",
//         "name": "",
//         "type": "string[]"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   }
// ];


// const contractAddress = '0xEb380eB1d9ffD6Da08183B16bF5aaE2c4f61007A'; 

// const generatePDF = (data) => {
//   const doc = new jsPDF();
//   doc.text("FIR Complaint Details", 10, 10);
//   doc.text(`Name: ${data.name}`, 10, 20);
//   doc.text(`Father's/Husband's Name: ${data.fatherHusbandName}`, 10, 30);
//   doc.text(`Mobile Number: ${data.phoneNumber}`, 10, 40);
//   doc.text(`Date of Birth: ${data.dateOfBirth || 'Not Provided'}`, 10, 50);
//   doc.text(`Village-Locality Name: ${data.villageLocality}`, 10, 60);
//   doc.text(`Address Line 1: ${data.addressLine1}`, 10, 70);
//   doc.text(`Address Line 2: ${data.addressLine2}`, 10, 80);
//   doc.text(`Pincode: ${data.pincode}`, 10, 90);
//   doc.text(`Grievance Title: ${data.grievanceTitle}`, 10, 100);
//   doc.text(`Grievance Description: ${data.grievanceDescription}`, 10, 110);
//   doc.text(`Police Station Name: ${data.policeStationName}`, 10, 120);

//   // Generate PDF Blob
//   const pdfBlob = doc.output('blob');
//   return pdfBlob;
// };

// const uploadToIPFS = async (file) => {
//   const API_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
//   const API_KEY = '1b5b57e2f3aaea6b8918';
//   const API_SECRET = 'df6676f87f0aa77f44d945d2de0b12d0936bc51a853d96d959f3421f2c5baaa0';

//   const formData = new FormData();
//   formData.append('file', file);

//   try {
//     const response = await axios.post(API_URL, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'pinata_api_key': API_KEY,
//         'pinata_secret_api_key': API_SECRET
//       }
//     });
//     return response.data.IpfsHash;
//   } catch (error) {
//     console.error('Error uploading to IPFS:', error);
//     throw error;
//   }
// };

// const ComplaintConfirmation = ({ formData, onEdit }) => {
//   const [showFile, setShowFile] = useState(false);
//   const [ipfsHash, setIpfsHash] = useState('');

//   // Setup Web3 and Contract
//   const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); // Change to your Ganache network URL
//   const firContract = new web3.eth.Contract(FIRContractABI, contractAddress);

//   const handleViewFile = () => setShowFile(!showFile);

//   const handleGeneratePDF = () => {
//     // Generate PDF
//     const pdfBlob = generatePDF(formData);

//     // Create a URL for the PDF Blob
//     const pdfUrl = URL.createObjectURL(pdfBlob);

//     // Create an anchor element to download the PDF
//     const link = document.createElement('a');
//     link.href = pdfUrl;
//     link.download = 'FIR_Complaint_Details.pdf';
//     link.click();

//     // Release the object URL after downloading
//     URL.revokeObjectURL(pdfUrl);
//   };

//   const storeCIDInDatabase = async (cid) => {
//     try {
//       const response = await axios.post('http://localhost:5000/storeCID', { cid });
//       if (response.status === 200) {
//         console.log('CID stored in MySQL database.');
//       } else {
//         console.error('Failed to store CID in database.');
//       }
//     } catch (error) {
//       console.error('Error storing CID in MySQL database:', error);
//     }
//   };

//   const handleSubmitComplaint = async () => {
//     try {
//       // Generate PDF Blob
//       const pdfBlob = generatePDF(formData);

//       // Upload PDF to IPFS
//       const ipfsHash = await uploadToIPFS(pdfBlob);
//       setIpfsHash(ipfsHash);

      
//       const accounts = await web3.eth.getAccounts();
//       await firContract.methods.storeCID(ipfsHash).send({ from: accounts[0] });

     
//       await storeCIDInDatabase(ipfsHash);

      
//       alert('PDF uploaded to IPFS, CID stored on the blockchain!');
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to submit complaint. Please try again.');
//     }
//   };

//   return (
//     <div className="complaint-confirmation">
//       <h2>Complaint Confirmation / शिकायत पुष्टीकरण</h2>
//       <p>Please review the details of your complaint before submitting.</p>
//       <p>कृपया सबमिट करने से पहले अपनी शिकायत के विवरण की समीक्षा करें।</p>

//       <table className="complaint-details">
//         <tbody>
//           <tr>
//             <th>Name</th>
//             <td>{formData.name}</td>
//           </tr>
//           <tr>
//             <th>Father's / Husband's Name</th>
//             <td>{formData.fatherHusbandName}</td>
//           </tr>
//           <tr>
//             <th>Mobile Number</th>
//             <td>{formData.phoneNumber}</td>
//           </tr>
//           <tr>
//             <th>Police Station Name</th>
//             <td>{formData.policeStationName}</td>
//           </tr>
//           <tr>
//             <th>Date of Crime</th>
//             <td>{formData.dateOfBirth || 'Not Provided'}</td>
//           </tr>
//           <tr>
//             <th>Village-Locality Name</th>
//             <td>{formData.villageLocality}</td>
//           </tr>
//           <tr>
//             <th>Address Line 1</th>
//             <td>{formData.addressLine1}</td>
//           </tr>
//           <tr>
//             <th>Address Line 2</th>
//             <td>{formData.addressLine2}</td>
//           </tr>
//           <tr>
//             <th>Pincode</th>
//             <td>{formData.pincode}</td>
//           </tr>
//           <tr>
//             <th>Grievance Title</th>
//             <td>{formData.grievanceTitle}</td>
//           </tr>
//           <tr>
//             <th>Grievance Description</th>
//             <td>{formData.grievanceDescription}</td>
//           </tr>
        
//           <tr>
//             <th>IPFS Hash</th>
//             <td>
//               {ipfsHash ? (
//                 <a href={`https://ipfs.io/ipfs/${ipfsHash}`} target="_blank" rel="noopener noreferrer">View PDF on IPFS</a>
//               ) : 'Not Provided'}
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       <div className="confirmation-actions">
//   <button className="shimmer-button" onClick={handleGeneratePDF}>Generate PDF</button>
//   <button className="shimmer-button" onClick={handleSubmitComplaint}>Submit Complaint</button>
//   <button className="shimmer-button" onClick={onEdit}>Edit Complaint</button>
// </div>

//     </div>
//   );
// };

// export default ComplaintConfirmation;







// import React, { useState } from 'react';
// import jsPDF from 'jspdf';
// import axios from 'axios';
// import Web3 from 'web3';
// import './ComplaintConfirmation.css';

// const FIRContractABI = [
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": false,
//         "internalType": "string",
//         "name": "cid",
//         "type": "string"
//       }
//     ],
//     "name": "CIDStored",
//     "type": "event"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "cid",
//         "type": "string"
//       }
//     ],
//     "name": "storeCID",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "getAllCIDs",
//     "outputs": [
//       {
//         "internalType": "string[]",
//         "name": "",
//         "type": "string[]"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   }
// ];

// const contractAddress = '0xEb380eB1d9ffD6Da08183B16bF5aaE2c4f61007A';

// const generatePDF = (data) => {
//   const doc = new jsPDF();
//   doc.text("FIR Complaint Details", 10, 10);
//   doc.text(`Name: ${data.name}`, 10, 20);
//   doc.text(`Father's/Husband's Name: ${data.fatherHusbandName}`, 10, 30);
//   doc.text(`Mobile Number: ${data.phoneNumber}`, 10, 40);
//   doc.text(`Date of Birth: ${data.dateOfBirth || 'Not Provided'}`, 10, 50);
//   doc.text(`Village-Locality Name: ${data.villageLocality}`, 10, 60);
//   doc.text(`Address Line 1: ${data.addressLine1}`, 10, 70);
//   doc.text(`Address Line 2: ${data.addressLine2}`, 10, 80);
//   doc.text(`Pincode: ${data.pincode}`, 10, 90);
//   doc.text(`Grievance Title: ${data.grievanceTitle}`, 10, 100);
//   doc.text(`Grievance Description: ${data.grievanceDescription}`, 10, 110);
//   doc.text(`Police Station Name: ${data.policeStationName}`, 10, 120);

//   // Generate PDF Blob
//   const pdfBlob = doc.output('blob');
//   return pdfBlob;
// };

// const uploadToIPFS = async (file, policeStationName) => {
//   const API_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

//   let API_KEY;
//   let API_SECRET;

//   switch (policeStationName) {
//     case 'ITWARI':
//       API_KEY = '5d46371af5553e751148';
//       API_SECRET = 'b319a2c6584359bd795a170b114042de0b87c2aac31e18db1326151305ef98bd';
//       break;
//     case 'HINGNA':
//       API_KEY = '140eadf0c08b873ded0d';
//       API_SECRET = 'aac4a579401a0f27cc5b104925e55555ba49650423768f4b184b5ab5bba18fea';
//       break;
//     case 'GODHANI':
//       API_KEY = ' 5cbb208c38913cc10e90';
//       API_SECRET = 'da0fe12bce7f062945fc78c84aa4fcbd1e773c6762b5f8c9f0f1828efd212a7d';
//       break;
//     case 'JARIPATKA':
//       API_KEY = ' 08cfd737c557261e9b32';
//       API_SECRET = 'a9327c296640c1b7545afee9c0a94f818a9102a0c3f616b98c5ee3e1c22264c0';
//       break;
//     case 'SADAR':
//       API_KEY = 'c1c84b14db97c6aaf995';
//       API_SECRET = '1cdfe84f4198c593331f1f81f91d7d68eb4d19edf4ff5d9b418e59ed1c2b0420';
//       break;
//     default:
//       throw new Error('Unknown police station name');
//   }

//   const formData = new FormData();
//   formData.append('file', file);

//   try {
//     const response = await axios.post(API_URL, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'pinata_api_key': API_KEY,
//         'pinata_secret_api_key': API_SECRET
//       }
//     });
//     return response.data.IpfsHash;
//   } catch (error) {
//     console.error('Error uploading to IPFS:', error);
//     throw error;
//   }
// };


// const ComplaintConfirmation = ({ formData, onEdit }) => {
//   const [showFile, setShowFile] = useState(false);
//   const [ipfsHash, setIpfsHash] = useState('');

//   // Setup Web3 and Contract
//   const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); // Change to your Ganache network URL
//   const firContract = new web3.eth.Contract(FIRContractABI, contractAddress);

//   const handleViewFile = () => setShowFile(!showFile);

//   const handleGeneratePDF = () => {
//     // Generate PDF
//     const pdfBlob = generatePDF(formData);

//     // Create a URL for the PDF Blob
//     const pdfUrl = URL.createObjectURL(pdfBlob);

//     // Create an anchor element to download the PDF
//     const link = document.createElement('a');
//     link.href = pdfUrl;
//     link.download = 'FIR_Complaint_Details.pdf';
//     link.click();

//     // Release the object URL after downloading
//     URL.revokeObjectURL(pdfUrl);
//   };

//   const storeCIDInDatabase = async (cid ,policeStationName ) => {
//     try {
//       const response = await axios.post('http://localhost:5000/store-data', { cid ,policeStationName });
//       if (response.status === 200) {
//         console.log('CID stored in MySQL database.');
//       } else {
//         console.error('Failed to store CID in database.');
//       }
//     } catch (error) {
//       console.error('Error storing CID in MySQL database:', error);
//     }
//   };

//   const handleSubmitComplaint = async () => {
//     try {
//       // Generate PDF Blob
//       const pdfBlob = generatePDF(formData);

//       // Create a file object from the PDF blob
//       const file = new File([pdfBlob], 'FIR_Complaint_Details.pdf', { type: 'application/pdf' });

//       // Extract police station name
//       const policeStationName = formData.policeStationName;

//       // Upload PDF to IPFS
//       const ipfsHash = await uploadToIPFS(file, policeStationName);
//       setIpfsHash(ipfsHash);

//       // Store CID on the blockchain
//       const accounts = await web3.eth.getAccounts();
//       await firContract.methods.storeCID(ipfsHash).send({ from: accounts[0] });

//       // Store CID in the database
//       await storeCIDInDatabase(ipfsHash);

//       alert('PDF uploaded to IPFS, CID stored on the blockchain!');
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to submit complaint. Please try again.');
//     }
//   };

//   return (
//     <div className="complaint-confirmation">
//       <h2>Complaint Confirmation / शिकायत पुष्टीकरण</h2>
//       <p>Please review the details of your complaint before submitting.</p>
//       <p>कृपया सबमिट करने से पहले अपनी शिकायत के विवरण की समीक्षा करें।</p>

//       <table className="complaint-details">
//         <tbody>
//           <tr>
//             <th>Name</th>
//             <td>{formData.name}</td>
//           </tr>
//           <tr>
//             <th>Father's / Husband's Name</th>
//             <td>{formData.fatherHusbandName}</td>
//           </tr>
//           <tr>
//             <th>Mobile Number</th>
//             <td>{formData.phoneNumber}</td>
//           </tr>
//           <tr>
//             <th>Police Station Name</th>
//             <td>{formData.policeStationName}</td>
//           </tr>
//           <tr>
//             <th>Date of Crime</th>
//             <td>{formData.dateOfBirth || 'Not Provided'}</td>
//           </tr>
//           <tr>
//             <th>Village-Locality Name</th>
//             <td>{formData.villageLocality}</td>
//           </tr>
//           <tr>
//             <th>Address Line 1</th>
//             <td>{formData.addressLine1}</td>
//           </tr>
//           <tr>
//             <th>Address Line 2</th>
//             <td>{formData.addressLine2}</td>
//           </tr>
//           <tr>
//             <th>Pincode</th>
//             <td>{formData.pincode}</td>
//           </tr>
//           <tr>
//             <th>Grievance Title</th>
//             <td>{formData.grievanceTitle}</td>
//           </tr>
//           <tr>
//             <th>Grievance Description</th>
//             <td>{formData.grievanceDescription}</td>
//           </tr>
//         </tbody>
//       </table>

//       <button onClick={handleGeneratePDF}>Generate PDF</button>
//       <button onClick={handleSubmitComplaint}>Submit Complaint</button>
//       <button onClick={onEdit}>Edit Complaint</button>

//       {ipfsHash && (
//         <div>
//           <p>Your complaint has been successfully submitted!</p>
//           <p>IPFS Hash: {ipfsHash}</p>
//         </div>
//       )}

//       {showFile && (
//         <iframe
//           title="PDF Preview"
//           src={`data:application/pdf;base64,${btoa(generatePDF(formData))}`}
//           style={{ width: '100%', height: '500px' }}
//         />
//       )}
//       <button onClick={handleViewFile}>
//         {showFile ? 'Hide PDF Preview' : 'Show PDF Preview'}
//       </button>
//     </div>
//   );
// };

// export default ComplaintConfirmation;



import React, { useState } from 'react';
import jsPDF from 'jspdf';
import axios from 'axios';
import Web3 from 'web3';
import './ComplaintConfirmation.css';

const FIRContractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "cid",
        "type": "string"
      }
    ],
    "name": "CIDStored",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "cid",
        "type": "string"
      }
    ],
    "name": "storeCID",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllCIDs",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const contractAddress = '0xEb380eB1d9ffD6Da08183B16bF5aaE2c4f61007A';

const generatePDF = (data) => {
  const doc = new jsPDF();
doc.text("FIR Complaint Details", 10, 10);
doc.text(`Name: ${data.name}`, 10, 20);
doc.text(`Father's/Husband's Name: ${data.fatherHusbandName}`, 10, 30);
doc.text(`Mobile Number: ${data.phoneNumber}`, 10, 40);
doc.text(`Date of Birth: ${data.dateOfBirth || 'Not Provided'}`, 10, 50);
doc.text(`Village-Locality Name: ${data.villageLocality}`, 10, 60);
doc.text(`Address Line 1: ${data.addressLine1}`, 10, 70);
doc.text(`Address Line 2: ${data.addressLine2}`, 10, 80);
doc.text(`Pincode: ${data.pincode}`, 10, 90);
doc.text(`Grievance Title: ${data.grievanceTitle}`, 10, 100);
doc.text(`Grievance Description: ${data.grievanceDescription}`, 10, 110);
doc.text(`Police Station Name: ${data.policeStationName}`, 10, 120);



  // Generate PDF Blob
  const pdfBlob = doc.output('blob');
  return pdfBlob;
};

const uploadToIPFS = async (file, policeStationName) => {
  const API_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

  let API_KEY;
  let API_SECRET;

  switch (policeStationName) {
    case 'ITWARI':
      API_KEY = '5d46371af5553e751148';
      API_SECRET = 'b319a2c6584359bd795a170b114042de0b87c2aac31e18db1326151305ef98bd';
      break;
    case 'HINGNA':
      API_KEY = '140eadf0c08b873ded0d';
      API_SECRET = 'aac4a579401a0f27cc5b104925e55555ba49650423768f4b184b5ab5bba18fea';
      break;
    case 'GODHANI':
      API_KEY = '5cbb208c38913cc10e90';
      API_SECRET = 'da0fe12bce7f062945fc78c84aa4fcbd1e773c6762b5f8c9f0f1828efd212a7d';
      break;
    case 'JARIPATKA':
      API_KEY = '08cfd737c557261e9b32';
      API_SECRET = 'a9327c296640c1b7545afee9c0a94f818a9102a0c3f616b98c5ee3e1c22264c0';
      break;
    case 'SADAR':
      API_KEY = 'c1c84b14db97c6aaf995';
      API_SECRET = '1cdfe84f4198c593331f1f81f91d7d68eb4d19edf4ff5d9b418e59ed1c2b0420';
      break;
    default:
      throw new Error('Unknown police station name');
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'pinata_api_key': API_KEY,
        'pinata_secret_api_key': API_SECRET
      }
    });
    return response.data.IpfsHash;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
};

const ComplaintConfirmation = ({ formData, onEdit }) => {
  const [showFile, setShowFile] = useState(false);
  const [ipfsHash, setIpfsHash] = useState('');

  // Setup Web3 and Contract
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); // Change to your Ganache network URL
  const firContract = new web3.eth.Contract(FIRContractABI, contractAddress);

  const handleViewFile = () => setShowFile(!showFile);

  const handleGeneratePDF = () => {
    // Generate PDF
    const pdfBlob = generatePDF(formData);

    // Create a URL for the PDF Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Create an anchor element to download the PDF
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'FIR_Complaint_Details.pdf';
    link.click();

    // Release the object URL after downloading
    URL.revokeObjectURL(pdfUrl);
  };

  const storeCIDInDatabase = async (cid, policeStationName) => {
    try {
      const response = await axios.post('http://localhost:5000/store-data', { cid, policeStationName });
      if (response.status === 200) {
        console.log('CID stored in MySQL database.');
      } else {
        console.error('Failed to store CID in database.');
      }
    } catch (error) {
      console.error('Error storing CID in MySQL database:', error);
    }
  };

  const handleSubmitComplaint = async () => {
    try {
      // Generate PDF Blob
      const pdfBlob = generatePDF(formData);

      // Create a file object from the PDF blob
      const file = new File([pdfBlob], 'FIR_Complaint_Details.pdf', { type: 'application/pdf' });

      // Extract police station name
      const policeStationName = formData.policeStationName;

      // Upload PDF to IPFS
      const ipfsHash = await uploadToIPFS(file, policeStationName);
      setIpfsHash(ipfsHash);

      // Store CID on the blockchain
      const accounts = await web3.eth.getAccounts();
      await firContract.methods.storeCID(ipfsHash).send({ from: accounts[0] });

      // Store CID in the database
      await storeCIDInDatabase(ipfsHash, policeStationName);

      alert('PDF uploaded to IPFS, CID stored on the blockchain!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit complaint. Please try again.');
    }
  };

  return (
    <div className="complaint-confirmation">
      <h2>Complaint Confirmation / शिकायत पुष्टीकरण</h2>
      <p>Please review the details of your complaint before submitting.</p>
      <p>कृपया सबमिट करने से पहले अपनी शिकायत के विवरण की समीक्षा करें।</p>

      <table className="complaint-details">
  <tbody>
    <tr>
      <th>Name / नाम</th>
      <td>{formData.name}</td>
    </tr>
    <tr>
      <th>Father's / Husband's Name / पिता/पति का नाम</th>
      <td>{formData.fatherHusbandName}</td>
    </tr>
    <tr>
      <th>Mobile Number / मोबाइल नंबर</th>
      <td>{formData.phoneNumber}</td>
    </tr>
    <tr>
      <th>Police Station Name / पुलिस थाना नाम</th>
      <td>{formData.policeStationName}</td>
    </tr>
    <tr>
      <th>Date of Crime / अपराध की तारीख</th>
      <td>{formData.dateOfBirth || 'Not Provided'}</td>
    </tr>
    <tr>
      <th>Village-Locality Name / गाँव-स्थान का नाम</th>
      <td>{formData.villageLocality}</td>
    </tr>
    <tr>
      <th>Address Line 1 / पता लाइन 1</th>
      <td>{formData.addressLine1}</td>
    </tr>
    <tr>
      <th>Address Line 2 / पता लाइन 2</th>
      <td>{formData.addressLine2}</td>
    </tr>
    <tr>
      <th>Pincode / पिनकोड</th>
      <td>{formData.pincode}</td>
    </tr>
    <tr>
      <th>Grievance Title / शिकायत का शीर्षक</th>
      <td>{formData.grievanceTitle}</td>
    </tr>
    <tr>
      <th>Grievance Description / शिकायत का विवरण</th>
      <td>{formData.grievanceDescription}</td>
    </tr>
    {/* <tr>
      <th>Show PDF Preview</th>
      <td>
        <button onClick={handleViewFile}>
          {showFile ? 'Hide PDF Preview' : 'Show PDF Preview'}
        </button>
      </td>
    </tr> */}
  </tbody>
</table>

      {showFile && (
  <iframe
    title="PDF Preview"
    src={`data:application/pdf;base64,${btoa(generatePDF(formData))}`}
    style={{ width: '100%', height: '500px' }}
  />
)}


<div className="confirmation-actions">
    <button className="shimmer-button" onClick={handleGeneratePDF}>Generate PDF</button>
    <button className="shimmer-button" onClick={handleSubmitComplaint}>Submit Complaint</button>
    <button className="shimmer-button" onClick={onEdit}>Edit Complaint</button>
</div>


      {ipfsHash && (
        <div>
          <p>Your complaint has been successfully submitted!</p>
          <p>IPFS Hash: {ipfsHash}</p>
        </div>
      )}
    </div>
  );
};

export default ComplaintConfirmation;

// import React, { useState } from 'react';
// import jsPDF from 'jspdf';
// import axios from 'axios';
// import Web3 from 'web3';
// import './ComplaintConfirmation.css';

// const FIRContractABI = [
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": false,
//         "internalType": "string",
//         "name": "cid",
//         "type": "string"
//       }
//     ],
//     "name": "CIDStored",
//     "type": "event"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "cid",
//         "type": "string"
//       }
//     ],
//     "name": "storeCID",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "getAllCIDs",
//     "outputs": [
//       {
//         "internalType": "string[]",
//         "name": "",
//         "type": "string[]"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   }
// ];

// const contractAddress = '0xEb380eB1d9ffD6Da08183B16bF5aaE2c4f61007A';

// const generatePDF = (data) => {
//   const doc = new jsPDF();
// // Add text information
// doc.text("FIR Complaint Details", 10, 10);
// doc.text(`Name: ${data.name}`, 10, 20);
// doc.text(`Father's/Husband's Name: ${data.fatherHusbandName}`, 10, 30);
// doc.text(`Mobile Number: ${data.phoneNumber}`, 10, 40);
// doc.text(`Date of Birth: ${data.dateOfBirth || 'Not Provided'}`, 10, 50);
// doc.text(`Village-Locality Name: ${data.villageLocality}`, 10, 60);
// doc.text(`Address Line 1: ${data.addressLine1}`, 10, 70);
// doc.text(`Address Line 2: ${data.addressLine2}`, 10, 80);
// doc.text(`Pincode: ${data.pincode}`, 10, 90);
// doc.text(`Grievance Title: ${data.grievanceTitle}`, 10, 100);
// doc.text(`Grievance Description: ${data.grievanceDescription}`, 10, 110);
// doc.text(`Police Station Name: ${data.policeStationName}`, 10, 120);


//   // Check if there's an image file to include
//   if (data.applicationPhoto) {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       const imgData = e.target.result;

//       // Add image to PDF
//       doc.addImage(imgData, 'JPEG', 10, 130, 180, 160); // Adjust size and position as needed

//       // Save the PDF after adding the image
//       doc.save('FIR_Complaint_Details.pdf');
//     };
//     reader.readAsDataURL(data.applicationPhoto);
//   } else {
//     // Save PDF without image
//     doc.save('FIR_Complaint_Details.pdf');
//   }
// };

// const uploadToIPFS = async (file, policeStationName) => {
//   const API_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

//   let API_KEY;
//   let API_SECRET;

//   switch (policeStationName) {
//     case 'ITWARI':
//       API_KEY = '5d46371af5553e751148';
//       API_SECRET = 'b319a2c6584359bd795a170b114042de0b87c2aac31e18db1326151305ef98bd';
//       break;
//     case 'HINGNA':
//       API_KEY = '140eadf0c08b873ded0d';
//       API_SECRET = 'aac4a579401a0f27cc5b104925e55555ba49650423768f4b184b5ab5bba18fea';
//       break;
//     case 'GODHANI':
//       API_KEY = '5cbb208c38913cc10e90';
//       API_SECRET = 'da0fe12bce7f062945fc78c84aa4fcbd1e773c6762b5f8c9f0f1828efd212a7d';
//       break;
//     case 'JARIPATKA':
//       API_KEY = '08cfd737c557261e9b32';
//       API_SECRET = 'a9327c296640c1b7545afee9c0a94f818a9102a0c3f616b98c5ee3e1c22264c0';
//       break;
//     case 'SADAR':
//       API_KEY = 'c1c84b14db97c6aaf995';
//       API_SECRET = '1cdfe84f4198c593331f1f81f91d7d68eb4d19edf4ff5d9b418e59ed1c2b0420';
//       break;
//     default:
//       throw new Error('Unknown police station name');
//   }

//   const formData = new FormData();
//   formData.append('file', file);

//   try {
//     const response = await axios.post(API_URL, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'pinata_api_key': API_KEY,
//         'pinata_secret_api_key': API_SECRET
//       }
//     });
//     return response.data.IpfsHash;
//   } catch (error) {
//     console.error('Error uploading to IPFS:', error);
//     throw error;
//   }
// };

// const ComplaintConfirmation = ({ formData, onEdit }) => {
//   const [showFile, setShowFile] = useState(false);
//   const [showImagePreview, setShowImagePreview] = useState(false);
//   const [ipfsHash, setIpfsHash] = useState('');

//   // Setup Web3 and Contract
//   const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
//   const firContract = new web3.eth.Contract(FIRContractABI, contractAddress);

//   const handleViewFile = () => setShowFile(!showFile);

//   const handleGeneratePDF = () => {
//     generatePDF(formData);
//   };

//   const storeCIDInDatabase = async (cid, policeStationName) => {
//     try {
//       const response = await axios.post('http://localhost:5000/store-data', { cid, policeStationName });
//       if (response.status === 200) {
//         console.log('CID stored in MySQL database.');
//       } else {
//         console.error('Failed to store CID in database.');
//       }
//     } catch (error) {
//       console.error('Error storing CID in MySQL database:', error);
//     }
//   };

//   const handleSubmitComplaint = async () => {
//     try {
//       const pdfBlob = generatePDF(formData);
//       const file = new File([pdfBlob], 'FIR_Complaint_Details.pdf', { type: 'application/pdf' });

//       const ipfsHash = await uploadToIPFS(file, formData.policeStationName);
//       setIpfsHash(ipfsHash);

//       const accounts = await web3.eth.getAccounts();
//       await firContract.methods.storeCID(ipfsHash).send({ from: accounts[0] });

//       await storeCIDInDatabase(ipfsHash, formData.policeStationName);

//       alert('PDF uploaded to IPFS, CID stored on the blockchain!');
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to submit complaint. Please try again.');
//     }
//   };

//   const handleShowImagePreview = () => {
//     setShowImagePreview(!showImagePreview);
//   };

//   return (
//     <div className="complaint-confirmation">
//       <h2>Complaint Confirmation / शिकायत पुष्टीकरण</h2>
//       <p>Please review the details of your complaint before submitting.</p>
//       <p>कृपया सबमिट करने से पहले अपनी शिकायत के विवरण की समीक्षा करें।</p>

//       <table className="complaint-details">
//         <tbody>
//           <tr>
//             <th>Name / नाम</th>
//             <td>{formData.name}</td>
//           </tr>
//           <tr>
//             <th>Father's / Husband's Name / पिता/पति का नाम</th>
//             <td>{formData.fatherHusbandName}</td>
//           </tr>
//           <tr>
//             <th>Mobile Number / मोबाइल नंबर</th>
//             <td>{formData.phoneNumber}</td>
//           </tr>
//           <tr>
//             <th>Date of Birth / जन्म तिथि</th>
//             <td>{formData.dateOfBirth || 'Not Provided'}</td>
//           </tr>
//           <tr>
//             <th>Village-Locality Name / गाँव-स्थान का नाम</th>
//             <td>{formData.villageLocality}</td>
//           </tr>
//           <tr>
//             <th>Address Line 1 / पता लाइन 1</th>
//             <td>{formData.addressLine1}</td>
//           </tr>
//           <tr>
//             <th>Address Line 2 / पता लाइन 2</th>
//             <td>{formData.addressLine2}</td>
//           </tr>
//           <tr>
//             <th>Pincode / पिनकोड</th>
//             <td>{formData.pincode}</td>
//           </tr>
//           <tr>
//             <th>Grievance Title / शिकायत का शीर्षक</th>
//             <td>{formData.grievanceTitle}</td>
//           </tr>
//           <tr>
//             <th>Grievance Description / शिकायत का विवरण</th>
//             <td>{formData.grievanceDescription}</td>
//           </tr>
//           <tr>
//             <th>Police Station Name / पुलिस स्टेशन का नाम</th>
//             <td>{formData.policeStationName}</td>
//           </tr>
//           {formData.applicationPhoto && (
//             <tr>
//               <th>Photo Preview / फोटो पूर्वावलोकन</th>
//               <td>
//                 <button onClick={handleShowImagePreview}>
//                   {showImagePreview ? 'Hide Photo Preview' : 'Show Photo Preview'}
//                 </button>
//                 {showImagePreview && (
//                   <div>
//                     <img
//                       src={URL.createObjectURL(formData.applicationPhoto)}
//                       alt="Uploaded Photo"
//                       style={{ maxWidth: '200px', marginTop: '10px' }}
//                     />
//                   </div>
//                 )}
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <div className="actions">
//   <button className="shimmer-button" onClick={handleGeneratePDF}>Generate PDF</button>
//   <button className="shimmer-button" onClick={handleSubmitComplaint}>Submit Complaint</button>
//   <button className="shimmer-button" onClick={onEdit}>Edit Complaint</button>
// </div>

//     </div>
//   );
// };

// export default ComplaintConfirmation;
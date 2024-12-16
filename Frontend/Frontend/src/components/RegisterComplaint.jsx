import React, { useState } from 'react';
import ComplaintConfirmation from './ComplaintConfirmation';
import './RegisterComplaint.css';

const RegisterComplaint = () => {
  const [formType, setFormType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    fatherHusbandName: '',
    phoneNumber: '',
    dateOfBirth: '',
    villageLocality: '',
    addressLine1: '',
    addressLine2: '',
    pincode: '',
    grievanceTitle: '',
    grievanceDescription: '',
    policeStationName: '',
    applicationPhoto: null,
    applicationPDF: null,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Mobile number must be exactly 10 digits.';
      isValid = false;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be exactly 6 digits.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleFormTypeChange = (type) => {
    setFormType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };
const handleEditComplaint=()=>{
  setSubmitted(false);
}
  if (submitted) {
    return <ComplaintConfirmation formData={formData} onEdit={handleEditComplaint} />;
  }

  return (
    <div className="register-complaint">
      {!formType ? (
        <div className="form-type-selection">
          <h2>Select Your Role / अपनी भूमिका चुनें</h2>
          <button
            type="button"
            className="shimmer-button"
            onClick={() => handleFormTypeChange('victim')}
          >
            Victim / पीड़ित
          </button>
          <button
            type="button"
            className="shimmer-button"
            onClick={() => handleFormTypeChange('witness')}
          >
            Witness / गवाह
          </button>
        </div>
      ) : (
        <>
          <h2>REGISTER GRIEVANCE / शिकायत दर्ज करें</h2>
          <p>Submit grievance by filling out all the fields below. Please fill the form correctly as the details entered will be used for further processing of your grievance.</p>
          <p>नीचे दिए गए सभी क्षेत्रों को भरकर शिकायत दर्ज करें। कृपया फ़ॉर्म को सही ढंग से भरें क्योंकि दर्ज किए गए विवरण का उपयोग आपकी शिकायत की आगे की प्रक्रिया के लिए किया जाएगा।</p>
          <form onSubmit={handleSubmit}>
            {/* Common Fields */}
            <label>
              Name* / नाम*
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              Father's / Husband's Name* / पिता का / पति का नाम*
              <input type="text" name="fatherHusbandName" value={formData.fatherHusbandName} onChange={handleChange} required />
            </label>
            <label>
              Mobile Number* / मोबाइल नंबर*
              <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
              {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
            </label>
            <label>
              Police Station Name* / पुलिस स्टेशन का नाम*
              <select
                name="policeStationName"
                value={formData.policeStationName}
                onChange={handleChange}
                required
              >
                <option value="">Select a Police Station / एक पुलिस स्टेशन चुनें</option>
                <option value="SADAR">SADAR</option>
                <option value="JARIPATKA">JARIPATKA</option>
                <option value="GODHANI">GODHANI</option>
                <option value="HINGNA">HINGNA</option>
                <option value="ITWARI">ITWARI</option>
              </select>
            </label>
            <label>
              Date of Crime / अपराध की तारीख
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
            </label>
            <label>
              Village-Locality Name* / गांव-स्थान का नाम*
              <input type="text" name="villageLocality" value={formData.villageLocality} onChange={handleChange} required />
            </label>
            <label>
              Address Line 1* / पता पंक्ति 1*
              <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} required />
            </label>
            <label>
              Address Line 2* / पता पंक्ति 2*
              <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} required />
            </label>
            <label>
              Pincode* / पिनकोड*
              <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
              {errors.pincode && <span className="error">{errors.pincode}</span>}
            </label>
            <label>
              Grievance Title* / शिकायत का शीर्षक*
              <input type="text" name="grievanceTitle" value={formData.grievanceTitle} onChange={handleChange} required />
            </label>
            <label>
              Grievance Description* / शिकायत का विवरण*
              <textarea name="grievanceDescription" value={formData.grievanceDescription} onChange={handleChange} required />
            </label>
            <label>
              Submit your applicant photo / अपना आवेदक फोटो सबमिट करें
              <input type="file" name="applicationPhoto" onChange={handleFileChange} />
            </label>

            <button type="submit" className="shimmer-button">Submit / सबमिट करें</button>
          </form>
        </>
      )}
    </div>
  );
};

export default RegisterComplaint;

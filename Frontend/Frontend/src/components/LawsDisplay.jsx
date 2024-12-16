
import React from 'react';
import './LawsDisplay.css'; 

const LawsDisplay = () => {
  const laws = [
    "⚖ Theft (Section 378 of the Indian Penal Code): Defines theft as dishonestly taking property out of someone's possession.",
    "⚖ Fraud (Section 420 of the Indian Penal Code): Defines cheating and dishonestly inducing delivery of property.",
    "⚖ Vandalism (Section 427 of the Indian Penal Code): Defines mischief causing damage to the amount of fifty rupees.",
    "⚖ Trespassing (Section 441 of the Indian Penal Code): Defines criminal trespass as entering into or remaining unlawfully on someone's property.",
    "⚖ Kidnapping (Section 359 of the Indian Penal Code): Defines kidnapping as the unlawful taking away or transportation of a person against their will.",
    "⚖ Embezzlement (Section 403 of the Indian Penal Code): Defines dishonest misappropriation of property.",
    "⚖ Forgery (Section 463 of the Indian Penal Code): Defines forgery as making a false document with the intent to cause damage or injury.",
    "⚖ Domestic Violence (Protection of Women from Domestic Violence Act, 2005, India): Defines domestic violence and provides protection for women from abuse.",
    "⚖ Bribery (Prevention of Corruption Act, 1988, India): Defines bribery and corruption in public office.",
    "⚖ Cybercrime (Information Technology Act, 2000, India): Covers offenses related to cybercrime, including hacking and data theft.",
    "⚖ Drug Possession (Narcotic Drugs and Psychotropic Substances Act, 1985, India): Governs the possession, use, and trafficking of narcotic drugs and psychotropic substances.",
    "⚖ Human Trafficking (Section 370 of the Indian Penal Code): Defines trafficking of persons for various exploitative purposes.",
    "⚖ Rape (Section 375 of the Indian Penal Code): Defines rape and prescribes punishment for it.",
    "⚖ Money Laundering (Prevention of Money Laundering Act, 2002, India): Governs the prevention of money laundering and the confiscation of property derived from money laundering.",
    "⚖ Counterfeiting Currency (Section 489A of the Indian Penal Code): Covers the counterfeiting of currency notes or bank notes.",
    
  ];

  return (
    <div className="laws-container">
      <div className="laws-slider">
        {laws.map((law, index) => (
          <div key={index} className="law-item">{law}</div>
        ))}
      </div>
    </div>
  );
};

export default LawsDisplay;
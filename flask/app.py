

# from flask import Flask, request, jsonify, render_template

# app = Flask(__name__)

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/get-response', methods=['POST'])
# def get_response():
#     user_message = request.json.get('message').lower()

#     # Respond to variations of the same question by matching keywords
#     if "benefit" in user_message or "using this site" in user_message:
#         response = "The benefits of using this site include easy FIR filing, tracking status, and quick support access."
#     elif "how" in user_message and ("use" in user_message or "navigate" in user_message or "access" in user_message) and "this site" in user_message:
#         response = "To use this site, you can file a FIR, track your FIR status, and contact support if needed."
#     elif ("file" in user_message or "lodge" in user_message) and "fir" in user_message:
#         response = "To file a FIR, click on the 'File FIR' button, fill out the required information, and submit the form."
#     elif "crime" in user_message:
#         response = "Crime refers to an action or omission that constitutes an offense and is punishable by law."
#     elif "who" in user_message and ("report" in user_message or "file" in user_message) and "fir" in user_message:
#         response = "Any person who has knowledge of the commission of a crime can report a FIR."
#     elif ("get" in user_message or "access" in user_message) and "fir form" in user_message:
#         response = "You can download or fill the FIR form online directly from our website under the 'File FIR' section."
#     elif "how long" in user_message and ("process" in user_message or "fir" in user_message):
#         response = "The processing time for an FIR depends on the complexity of the case, but you'll receive an acknowledgment immediately."
#     elif "track" in user_message and "fir" in user_message:
#         response = "Yes, you can track the status of your FIR under the 'Track FIR' section on our website."
#     elif "contact" in user_message and "support" in user_message:
#         response = "To contact support, please use the 'Contact Support' option available on the homepage."
#     elif "technology" in user_message and "used" in user_message:
#         response = "This system uses modern web technologies such as Flask for the backend and React for the frontend, along with blockchain for secure data handling."
#     elif "blockchain" in user_message:
#         response = "Blockchain is a decentralized ledger technology that ensures secure and transparent transactions without intermediaries."
#     elif "fir" in user_message and "information" in user_message:
#         response = "A First Information Report (FIR) is a document prepared by the police when they receive information about the commission of a crime."
#     elif "why is face detection required" in user_message:
#         response = "Face detection is required to estimate your age and ensure you are eligible to file an FIR."
#     elif "send" in user_message and "otp" in user_message:
#         response = "Enter your Aadhaar and mobile numbers, and click the 'Send OTP' button to receive an OTP."
#     elif "what to do after otp" in user_message:
#         response = "After receiving the OTP, enter it in the OTP field and proceed with age validation."
#     elif "how to validate age" in user_message:
#         response = "Click the 'Age Validation' button to start the camera and validate your age through face detection."
#     elif "how does age estimation work" in user_message:
#         response = "Age estimation is based on detecting your face through the camera and calculating your approximate age."
#     elif "what if my age is below 18" in user_message:
#         response = "If you're below 18, the system will prevent you from filing an FIR."
#     elif "why do I need an aadhaar number" in user_message:
#         response = "The Aadhaar number is required to verify your identity before allowing you to file an FIR."
#     elif "incorrect otp" in user_message:
#         response = "If you enter the wrong OTP, you won't be able to log in. Please enter the correct OTP sent to your mobile."
#     elif "why can't I file an FIR" in user_message:
#         response = "You need to complete age validation and ensure your face is detected to proceed with filing an FIR."
#     elif "why is the camera not detecting my face" in user_message:
#         response = "Ensure you're facing the camera properly, with adequate lighting, for the system to detect your face."
#     elif "how to file an FIR" in user_message:
#         response = "To file an FIR, click the 'File FIR' button, fill out the form with necessary details, and submit."
#     elif "how to contact support" in user_message:
#         response = "You can contact support by using the 'Contact Support' option available on the homepage."
#     elif "how to track FIR status" in user_message:
#         response = "You can track the status of your FIR by visiting the 'Track FIR' section on the website."
#     elif "can I file an FIR without age validation" in user_message:
#         response = "No, you must complete age validation through the camera before filing an FIR."
#     elif "is blockchain used" in user_message:
#         response = "Yes, blockchain is used for secure and transparent data handling in the FIR system."
#     elif "what is the purpose of blockchain" in user_message:
#         response = "Blockchain ensures secure, tamper-proof transactions, maintaining the integrity of the FIR data."
#     elif "how long does FIR processing take" in user_message:
#         response = "FIR processing time depends on the case complexity, but you'll receive acknowledgment after submission."
#     elif "is OTP mandatory" in user_message:
#         response = "Yes, OTP verification is mandatory for login and proceeding with the FIR filing process."
#     elif "who can report an FIR" in user_message:
#         response = "Anyone with knowledge of a crime can report or file an FIR."
#     elif "hi" in user_message or "hello" in user_message or "help" in user_message:
#         response = "hello!. i am bot for fir filing system how can i help you"   
#     else:
#         response = "I'm sorry, I didn't understand that. Can you please rephrase?"

#     return jsonify({"response": response})

# if __name__ == '__main__':
#     app.run(debug=True)


















# from flask import Flask, request, jsonify, render_template
# from fuzzywuzzy import fuzz

# app = Flask(__name__)

# # FAQ dictionary with question-answer pairs
# faq = {
#     "benefits of using this site": "The benefits of using this site include easy FIR filing, tracking status, and quick support access.",
#     "how to use this site": "To use this site, you can file a FIR, track your FIR status, and contact support if needed.",
#     "file fir": "To file a FIR, click on the 'File FIR' button, fill out the required information, and submit the form.",
#     "what is blockchain": "Blockchain is a decentralized ledger technology that ensures secure and transparent transactions without intermediaries.",
#     "hello": "press hello to get details  of police station type(near police station)",
#     "how to validate age": "Click the 'Age Validation' button to start the camera and validate your age through face detection.",
#     "what if my age is below 18": "If you're below 18, the system will prevent you from filing an FIR.",
#     "how to contact support": "You can contact support by using the 'Contact Support' option available on the homepage.",
#     "near police station,police station":"there are many police station with there  station code like 1]Sadar police station = 101, 2] Godni(mankapur) police station = 102 , 3]Jharipatka police station = 103 , 4] Hingna police station =104 ,5]Itwari police station = 105 .... for more details only type police station code i provide details to you...",
#     "101": "101 is refer to sadar police station it address is := 536C+MH7, Futala Rd, Sadar, Nagpur, Maharashtra 440001..... and the contact details of Sadar police station is mobile no := 9910234523",
#     "102": "102(mankapur) is refer to Godni police station its address is := Back side of Bank of India, Godhani Road, Nagpur, Maharashtra 441123..... and the contact details of Godni(mankapur) police station is mobile no:= 9987654321",
#     "103": "103 is refer to Jharipakta police station its address is := 53QR+PPR, Ring Rd Jaripatka, Kukreja Nagar, Nagpur, Maharashtra 440014..... and the contact details of Jharipatka police station is mobile no:= 97657865432",
#     "104": "104 is refer to Hingna police station its address is := 3XG9+WGV, Hingna, Dangarpura, Raipur, Maharashtra 441110.....and the contact details of Hingna police station is mobile no:= 9875674332",
#     "105": "105 is refer to Itwari police station its address is := Thermal Power Station, Chhindwara Rd, near Koradi, Panjara, Koradi, Maharashtra 441111.....and the contact details of koradi police station is mobile no:= 9623958833",

# }


# # Fuzzy matching function to find the best match for the user's message
# def find_best_match(user_message):
#     highest_ratio = 0
#     best_match = None

#     for question in faq.keys():
#         ratio = fuzz.ratio(user_message.lower(), question.lower())
#         if ratio > highest_ratio:
#             highest_ratio = ratio
#             best_match = question
    
#     # Return best match if it exceeds a threshold (e.g., 60)
#     return best_match if highest_ratio > 60 else None

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/get-response', methods=['POST'])
# def get_response():
#     try:
#         user_message = request.json.get('message', '').lower()
        
#         # Use fuzzy matching to find the best match
#         best_match = find_best_match(user_message)

#         if best_match:
#             response = faq[best_match]
#         else:
#             response = "I'm sorry, I didn't understand that. Can you please rephrase?"

#         return jsonify({"response": response})
#     except Exception as e:
#         return jsonify({"response": f"An error occurred: {str(e)}"})

# if __name__ == '__main__':
#     app.run(debug=True)









































from flask import Flask, request, jsonify, render_template
from fuzzywuzzy import fuzz
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# FAQ dictionary with question-answer pairs
faq = {
    "benefits of using this site": "The benefits of using this site include easy FIR filing, tracking status, and quick support access.",
    "how to use this site": "To use this site, you can file a FIR, track your FIR status, and contact support if needed.",
    "file fir": "you first to login the with the adhar no then select that you are witness or victem then click on fill fir there fill the fir and submit ",
    "what is blockchain": "Blockchain is a decentralized ledger technology that ensures secure and transparent transactions without intermediaries.",
    "hello": "Press hello to get details of police station type (near police station).",
    "how to validate age": "Click the 'Age Validation' button to start the camera and validate your age through face detection.",
    "what if my age is below 18": "If you're below 18, the system will prevent you from filing an FIR.",
    "how to contact support": "You can contact support by using the 'Contact Support' option available on the homepage.",
    "near police station, police station": "There are many police stations with their station codes like 1] Sadar police station = 101, 2] Godni (Mankapur) police station = 102, 3] Jharipatka police station = 103, 4] Hingna police station = 104, 5] Itwari police station = 105. For more details, only type the police station code and I will provide details to you.",
    "101": "101 refers to Sadar Police Station. Address: 536C+MH7, Futala Rd, Sadar, Nagpur, Maharashtra 440001. Contact: 9910234523.",
    "102": "102 refers to Godni (Mankapur) Police Station. Address: Back side of Bank of India, Godhani Road, Nagpur, Maharashtra 441123. Contact: 9987654321.",
    "103": "103 refers to Jharipatka Police Station. Address: 53QR+PPR, Ring Rd Jaripatka, Kukreja Nagar, Nagpur, Maharashtra 440014. Contact: 97657865432.",
    "104": "104 refers to Hingna Police Station. Address: 3XG9+WGV, Hingna, Dangarpura, Raipur, Maharashtra 441110. Contact: 9875674332.",
    "105": "105 refers to Itwari Police Station. Address: Thermal Power Station, Chhindwara Rd, near Koradi, Panjara, Koradi, Maharashtra 441111. Contact: 9623958833."
}

# Fuzzy matching function to find the best match for the user's message
def find_best_match(user_message):
    highest_ratio = 0
    best_match = None

    for question in faq.keys():
        ratio = fuzz.ratio(user_message.lower(), question.lower())
        if ratio > highest_ratio:
            highest_ratio = ratio
            best_match = question
    
    # Return best match if it exceeds a threshold (e.g., 60)
    return best_match if highest_ratio > 60 else None

@app.route('/')
def index():
    return render_template('index.html')  # Serve your frontend here

@app.route('/get-response', methods=['POST'])
def get_response():
    try:
        user_message = request.json.get('message', '').lower()

        # Check if the user provided a police station code
        if user_message.isdigit() and int(user_message) > 105:
            response = "Sorry, this code is not authenticated by me."
        else:
            # Use fuzzy matching to find the best match
            best_match = find_best_match(user_message)

            if best_match:
                response = faq[best_match]
            else:
                response = "I'm sorry, I didn't understand that. Can you please rephrase?"

        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"response": f"An error occurred: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Run the Flask app in debug mode








































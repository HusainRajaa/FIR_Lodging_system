# from flask import Flask, request, jsonify
# from twilio.rest import Client
# import random
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Your Twilio credentials - Set these in your environment variables
# account_sid = 'YOUR_TWILIO_ACCOUNT_SID'
# auth_token = 'YOUR_TWILIO_AUTH_TOKEN'
# from_phone_number = '+1XXXXXXXXXX'  # This must be a Twilio number

# client = Client(account_sid, auth_token)

# @app.route('/send-otp', methods=['POST'])
# def send_otp():
#     data = request.json
#     to_phone_number = data.get('toPhoneNumber')

#     if not to_phone_number:
#         return jsonify({"error": "Phone number is required"}), 400

#     otp = str(random.randint(100000, 999999))  # Generate a 6-digit OTP
#     message_body = f"Your OTP is {otp}"

#     try:
#         message = client.messages.create(
#             body=message_body,
#             from_=from_phone_number,
#             to=to_phone_number
#         )
#         print(f"Message sent successfully! SID: {message.sid}")
#         return jsonify({"message": "OTP sent successfully!", "otp": otp}), 200
#     except Exception as e:
#         print(f"Failed to send message: {e}")
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)


from flask import Flask, request, jsonify
from twilio.rest import Client
import random
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Your Twilio credentials - Set these in your environment variables
import os
account_sid = os.environ.get('TWILIO_ACCOUNT_SID', 'YOUR_TWILIO_ACCOUNT_SID')
auth_token = os.environ.get('TWILIO_AUTH_TOKEN', 'YOUR_TWILIO_AUTH_TOKEN')
from_phone_number = os.environ.get('TWILIO_PHONE_NUMBER', '+1XXXXXXXXXX')  # This must be a Twilio number

client = Client(account_sid, auth_token)

# MySQL database connection
def get_db_connection():
    conn = mysql.connector.connect(
        host="localhost",  # Change to your MySQL host
        user="root",  # Change to your MySQL user
        password=os.environ.get('MYSQL_PASSWORD', 'YOUR_PASSWORD'),  # Change to your MySQL password
        database="blockchain2"  # Change to your MySQL database
    )
    return conn

# Fetch mobile number by Aadhaar number
@app.route('/fetch-mobile', methods=['POST'])
def fetch_mobile():
    data = request.json
    aadhaar_number = data.get('aadhaar_number')
    
    if not aadhaar_number:
        return jsonify({"error": "Aadhaar number is required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Query to fetch the mobile number from the database based on the Aadhaar number
    query = "SELECT mobile_number FROM users WHERE aadhaar_number = %s"
    cursor.execute(query, (aadhaar_number,))
    result = cursor.fetchone()
    
    conn.close()

    if result:
        mobile_number = result[0]
        return jsonify({'mobile_number': mobile_number}), 200
    else:
        return jsonify({'error': 'Aadhaar number not found'}), 404

# Send OTP to the fetched mobile number
@app.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.json
    aadhaar_number = data.get('aadhaarNumber')
    to_phone_number = data.get('toPhoneNumber')

    if not aadhaar_number:
        return jsonify({"error": "Aadhaar number is required"}), 400

    if not to_phone_number:
        return jsonify({"error": "Phone number is required"}), 400

    otp = str(random.randint(100000, 999999))  # Generate a 6-digit OTP
    message_body = f"Your OTP is {otp}"

    try:
        message = client.messages.create(
            body=message_body,
            from_=from_phone_number,
            to=to_phone_number
        )
        print(f"Message sent successfully! SID: {message.sid}")
        return jsonify({"message": "OTP sent successfully!", "otp": otp}), 200
    except Exception as e:
        print(f"Failed to send message: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)

from flask import Flask, jsonify, request, send_file
from pony.orm import Database, Required, db_session
from flask_cors import CORS
from datetime import datetime
from pony.converting import str2datetime
from dotenv import load_dotenv
import os
import requests
import qrcode

# Load environment variables from .env file
load_dotenv()

# Create a Flask instance
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Create a database using Pony
db = Database()

# Configuring the database using environment variables
db.bind(
    provider=os.getenv('DB_PROVIDER'),
    host=os.getenv('DB_HOST'),
    port=int(os.getenv('DB_PORT')),
    user=os.getenv('DB_USER'),
    passwd=os.getenv('DB_PASSWORD'),
    db=os.getenv('DB_NAME')
)


@app.route('/api/getcocktail/<userInput>', methods=['GET'])

def get_cocktail(userInput):
    # Http request to the cocktaildb API
    response = requests.get(f'https://www.thecocktaildb.com/api/json/v1/1/search.php?s={userInput}')

    # Return a response from external API
    if response.status_code == 200:
        return jsonify(response.json()), 200
    else:
        return jsonify({"error": "Unable to fetch data"}), 500



@app.route('/api/generateqrcode/<cocktailId>', methods=['GET'])

def generateQrCode(cocktailId):
    try:
        # Creating QR Code with personalised message
        img = qrcode.make('Thank you for you purchase')

        # Defining path to save qrcodes
        save_dir = os.path.join(os.getcwd(), 'static', 'qrcodes')  # Cartella static/qrcodes

        # Verifyin if directory exists, otherwise we create it
        if not os.path.exists(save_dir):
            os.makedirs(save_dir)


        # Saving Qrcode image with coctail is
        img_path = os.path.join(save_dir, f"cocktail-{cocktailId}.png")
        img.save(img_path)

        # Return the path
        return send_file(img_path, mimetype='image/png')
    except Exception as e:
        print(f"Error generating QR code: {e}")
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
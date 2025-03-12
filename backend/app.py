from flask import Flask, jsonify, request
from pony.orm import Database, Required, db_session
from flask_cors import CORS
from datetime import datetime
from pony.converting import str2datetime
from dotenv import load_dotenv
import os
import requests

# Loadng environment variables from .env file
load_dotenv()

# Create a Flask instance
app = Flask(__name__)

CORS(app)

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


@app.route('/api/getmargherita', methods=['GET'])
def get_margherita():

    # Chiamata GET verso un'API esterna usando requests
    response = requests.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')

    # Restituisci la risposta dall'API esterna
    if response.status_code == 200:
        return jsonify(response.json()), 200
    else:
        return jsonify({"error": "Unable to fetch data"}), 500


if __name__ == '__main__':
    app.run(debug=True)
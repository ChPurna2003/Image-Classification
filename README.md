# Image-Classification skin disease detection
Project Overview
This project is a web application built using Flask that provides an interface for analyzing images using a machine learning model. The application utilizes the Inference SDK to interact with a remote API for image detection.

Table of Contents
Features
Technologies Used
Installation
Usage
File Structure
License
Features
User-friendly web interface for image analysis.
Integration with the Inference SDK for image detection.
Ability to upload images for analysis.
Technologies Used
Flask: A lightweight WSGI web application framework.
Inference SDK: For interacting with the image detection API.
HTML/CSS: For front-end development.
Python: The programming language used for backend development.
Installation
To set up the project locally, follow these steps:

Clone the repository:

bash

Verify

Open In Editor
Run
Copy code
git clone <repository-url>
cd <repository-directory>
Create a virtual environment (optional but recommended):

bash

Verify

Open In Editor
Run
Copy code
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
Install the required packages:

bash

Verify

Open In Editor
Run
Copy code
pip install -r requirements.txt
Usage
Run the application:

bash

Verify

Open In Editor
Run
Copy code
python app.py
Access the application: Open your web browser and go to http://localhost:5000.

Upload an image: Use the provided interface to upload an image for analysis.

File Structure

Verify

Open In Editor
Run
Copy code
/app.py                # Main application file
/requirements.txt      # List of dependencies
/templates/            # Directory for HTML templates
    /analyze.html      # Template for the analysis page
    /app.html          # Template for the main app page
/img                   # Directory for uploaded image

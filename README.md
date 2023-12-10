
# Blood Pressure Health Tracker

## Overview

This web application is designed to predict the blood pressure stage of a user based on a set of questions about their (age, height, weight, physical activities, alcohol consumption, low and high blood pressure) using a deep-learning neural network implemented in Keras. The backend is built with NodeJS, and the frontend with ReactJS. User data is stored in a MongoDB database. Users have the ability to view their test history, and the system is integrated with articles about blood pressure for educational purposes.

## Prerequisites

Before running the web app, make sure you have the following installed:

- Python for running the Keras neural network model.
- Required Python libraries for the model (install using `pip install -r requirements.txt`).
- Node.js for the backend.


## Getting Started

To run the web app, follow these steps:

1. Ensure Python and the required libraries are installed.
2. Run the Machine Learinig Model: `cd Backend/ML && python app.py`  
3. Install backend dependencies: `cd Backend && npm i`
4. Install frontend dependencies: `cd Frontend && npm i --force`
5. Run the project: `npm run con`
   
6. **Open the Application**: Open your browser and navigate to [http://localhost:3000](http://localhost:3000) or the specific port where the application automatically opens.



## Usage

1. **Register**: Sign up with a valid email. A verification email will be sent to your registered email address.

2. **Verify Email**: Visit your email inbox, click the verification link, and return to the app.

3. **Login**: Log in to the system with your registered credentials.

4. **Make a Test**: Complete the test to receive your blood pressure stage prediction.

5. **View History**: Check the history section to review your previous test details and results.

6. **Explore Articles**: Utilize the integrated articles to enhance your knowledge about blood pressure.

## Notes

- The system uses MongoDB to store user registrations and test data.
- Users can retake the test to receive updated blood pressure stage predictions.
- Ensure a stable internet connection for seamless functionality.

Feel free to contribute or report issues by creating a pull request or opening an issue on GitHub.


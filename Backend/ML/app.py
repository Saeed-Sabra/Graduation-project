from flask import Flask, request, jsonify
import pandas as pd
from tensorflow import keras
from sklearn.preprocessing import LabelEncoder
import joblib

app = Flask(__name__)

# Load your trained model
model = keras.models.load_model('./new_model.h5')

# Load the LabelEncoder's classes_ attribute as an array
label_encoder_classes = joblib.load('./label_encoder_classes.pkl')

# Create a new LabelEncoder instance and set its classes_
label_encoder = LabelEncoder()
label_encoder.classes_ = label_encoder_classes

@app.route('/predict', methods=['POST'])
def predict():
    data =request.get_json()
    print("Received data:", data)
    if isinstance(data, list):
        # Assuming 'data' is a list of dictionaries, convert it into a DataFrame
        df = pd.DataFrame(data)
        print( df)
        # Make predictions using the model
        prediction_probs = model.predict(df)
        print("Prediction probabilities:", prediction_probs)

        # Convert the predicted probabilities back to class labels
        predictions = label_encoder.inverse_transform(prediction_probs.argmax(axis=1))
        print("Predictions:", predictions)
        return jsonify({"predictions": predictions.tolist()})
    else:
        return jsonify({"error": "Invalid data format. Expected a list of dictionaries."}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

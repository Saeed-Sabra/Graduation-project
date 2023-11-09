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


# from flask import Flask, request, jsonify
# import pandas as pd
# from tensorflow import keras

# app = Flask(__name__)

# # Load your trained model
# model = keras.models.load_model('./model_weights_r.h5')

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.get_json()
#     if isinstance(data, list):
#         # Assuming 'data' is a list of dictionaries, convert it into a DataFrame
#         df = pd.DataFrame(data)
#         prediction = model.predict(df).flatten().tolist()[0]
#         return jsonify({"prediction": prediction})
#     else:
#         return jsonify({"error": "Invalid data format. Expected a list of dictionaries."}), 400

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)








# from flask import Flask, request, jsonify
# import pandas as pd
# from tensorflow import keras
# import numpy as np
# from sklearn.preprocessing import LabelEncoder
# from keras.utils import to_categorical


# app = Flask(__name__)

# # Load your trained model
# model = keras.models.load_model('./new_model.h5')

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.get_json()
#     # if isinstance(data, list):
#     #     # Assuming 'data' is a list of dictionaries, convert it into a DataFrame
#     #     df = pd.DataFrame(data)
#     #     # Preprocess the input data
#     #     preprocessor = LabelEncoder()
#     #     for col in df:
#     #         df[col] = preprocessor.fit_transform(df[col])
#     #         # Convert categorical variables back to binary format (one-hot encoding)
#     #         df[col] = to_categorical(df[col], num_classes=len(preprocessor.classes_))
#     #         # Reshape the input data
#     #         df[col] = df[col].values.reshape(-1, 2048)
#     #         # Predict using the loaded model
#     #     predictions = model.predict(df)
#     #     return jsonify({"prediction": predictions})
#     # else:
#     #     print("Invalid Input")
#     #     return "Error", 400

#     # if isinstance(data, list):
#     #     # Assuming 'data' is a list of dictionaries, convert it into a DataFrame
#     #     df = pd.DataFrame(data)
#     #     # Preprocess the input data
#     #     preprocessor = LabelEncoder()
        
#     #     # Apply Label Encoding to categorical columns (e.g., 'Gender', 'cholesterol', 'gluc', 'smoke', 'alco', 'active')
#     #     categorical_cols = ['Gender', 'cholesterol', 'gluc', 'smoke', 'alco', 'active']
#     #     for col in categorical_cols:
#     #         df[col] = preprocessor.fit_transform(df[col])
        
#     #     # Reshape the input data (assuming all columns are used as features)
#     #     input_data = df.values  # Convert the DataFrame to a NumPy array
        
#     #     # Predict using the loaded model
#     #     predictions = model.predict(input_data)
        
#     #     return jsonify({"prediction": predictions.tolist()})
#     # else:
#     #     print("Invalid Input")
#     #     return "Error", 400

#         pred_probs = model.predict(df).flatten().tolist()[0]
#         l_encode = LabelEncoder()
#         l_encode.fit(pred_probs)
#         Y = l_encode.transform(pred_probs)
#         pred = np.argmax(Y, axis=1)
#         pred_ = l_encode.inverse_transform(Y)


#         return jsonify({"prediction": pred_})
#     else:
#         return jsonify({"error": "Invalid data format. Expected a list of dictionaries."}), 400

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)

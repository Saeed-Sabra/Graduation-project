# from flask import Flask, request, jsonify
# import tensorflow as tf

# app = Flask(__name__)

# # Load your pre-trained model
# model = tf.keras.models.load_model('./model_weights.h5')

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.json
#     # Assuming you preprocess the data and convert it to the expected format
#     result = model.predict(data)
#     return jsonify({'prediction': result.tolist()})

# if __name__ == '__main__':
#     app.run()

# from flask import Flask, request, jsonify
# import pandas as pd
# from tensorflow import keras

# app = Flask(__name__)

# # Load your trained model
# model = keras.models.load_model('model_weights.h5')



# @app.route('/predict', methods=['POST'])
# def predict():
#         data = request.get_json()
#         df = pd.DataFrame([list(i.values()) for i in data])
#         prediction = model.predict(df).flatten().tolist()[0]
#         return jsonify({"prediction": round(prediction, 2)})



#     # try:
#     #     data = request.get_json()
#     #     print(data)
#     #     predictions = model.predict(data)

#     #     return jsonify({'predictions': predictions.tolist()})
#     # except Exception as e:
#     #     return jsonify({'error': str(e)})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)

from flask import Flask, request, jsonify
import pandas as pd
from tensorflow import keras

app = Flask(__name__)

# Load your trained model
model = keras.models.load_model('./model_weights_r.h5')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if isinstance(data, list):
        # Assuming 'data' is a list of dictionaries, convert it into a DataFrame
        df = pd.DataFrame(data)
        prediction = model.predict(df).flatten().tolist()[0]
        return jsonify({"prediction": prediction})
    else:
        return jsonify({"error": "Invalid data format. Expected a list of dictionaries."}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

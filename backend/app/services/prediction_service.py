import tensorflow as tf
import numpy as np
import os
from PIL import Image
import io

IMG_SIZE = 384

# Configuration
CLASS_NAMES = ["Normal", "Benign", "Malignant"]
# Configuration
CLASS_NAMES = ["Normal", "Benign", "Malignant"]
# Model is located in backend/ root. This file is in backend/app/services/
# So we need to go up two levels.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MODEL_PATH = os.path.join(BASE_DIR, "mammography_efficientnet.keras")

class PredictionService:
    def __init__(self):
        self.model = None
        self._load_model()

    def _load_model(self):
        if os.path.exists(MODEL_PATH):
            print(f"Loading model from {MODEL_PATH}...")
            self.model = tf.keras.models.load_model(MODEL_PATH)
            print("Model loaded successfully.")
        else:
            print(f"Error: Model file not found at {MODEL_PATH}")

    def preprocess_image(self, image_bytes):
        """
        Preprocesses the image bytes to match the model input requirements.
        """
        img = tf.io.decode_image(image_bytes, channels=3)
        img = tf.image.resize(img, (IMG_SIZE, IMG_SIZE))
        img = tf.expand_dims(img, axis=0) # Add batch dimension
        # efficientnet.preprocess_input expects inputs in range [0, 255] if using 'imagenet' weights usually, 
        # but tf.keras.applications.efficientnet.preprocess_input implementation 
        # basically does nothing for EfficientNet (it expects 0-255).
        # However, checking the user snippet:
        img = tf.keras.applications.efficientnet.preprocess_input(img)
        return img

    def predict(self, image_bytes):
        if not self.model:
            raise Exception("Model not loaded")

        processed_img = self.preprocess_image(image_bytes)
        
        preds = self.model.predict(processed_img, verbose=0)[0]
        pred_class_index = np.argmax(preds)
        pred_class = CLASS_NAMES[pred_class_index]
        confidence = float(np.max(preds))
        
        # Create a dictionary of probabilities
        probabilities = {class_name: float(prob) for class_name, prob in zip(CLASS_NAMES, preds)}

        return {
            "class": pred_class,
            "confidence": confidence,
            "probabilities": probabilities
        }

prediction_service = PredictionService()

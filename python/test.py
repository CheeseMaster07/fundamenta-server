import pickle
import os
from train_model import train_and_save_model


current_dir = os.path.dirname(os.path.abspath(__file__))
csv_file_path = os.path.join(current_dir, 'generation_dataset.csv')
pickle_file_path = os.path.join(current_dir, 'model.pickle')

# Check if the pickle file exists
if not os.path.exists(pickle_file_path):
    # Train the model and save it to the pickle file
    train_and_save_model(csv_file_path, pickle_file_path)

# Load the model and test data from the pickle file
with open(pickle_file_path, 'rb') as f:
    saved_data = pickle.load(f)
    best_model = saved_data['model']
    X_test = saved_data['X_test']
    y_test = saved_data['y_test']

score = best_model.score(X_test, y_test)
print(score)


import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
import pickle

def train_and_save_model(csv_file_path, pickle_file_path):
    data = pd.read_csv(csv_file_path)
    X = data.drop(columns=["generation"])
    y = data["generation"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    best = 0
    best_model = None

    for _ in range(5):
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

        model = DecisionTreeClassifier()
        model.fit(X_train, y_train)

        score = model.score(X_test, y_test)

        if score > best:
            best = score
            best_model = model

    # Save the trained model and test data to the pickle file
    saved_data = {'model': best_model, 'X_test': X_test, 'y_test': y_test}
    with open(pickle_file_path, 'wb') as f:
        pickle.dump(saved_data, f)
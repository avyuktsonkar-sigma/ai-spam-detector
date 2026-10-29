"""
Project: AI Spam & Phishing Message Classifier
Algorithm: Multinomial Naive Bayes with TF-IDF Vectorization
Domain: Machine Learning / Natural Language Processing (NLP)
"""

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report

# 1. Dataset Generation (SMS / Email Messages)
data = {
    'label': [
        'spam', 'spam', 'spam', 'spam', 'spam', 'spam',
        'ham', 'ham', 'ham', 'ham', 'ham', 'ham'
    ],
    'text': [
        'Win cash prize $1000 free click link to claim offer',
        'Urgent your bank account suspended verify password immediately',
        'Congratulations you won lottery reward claim your bonus now',
        'Free entry in weekly contest txt call to win money',
        'Exclusive loan offer approved zero interest click here',
        'Account blocked due to security alert update your details now',
        'Hey are we meeting for coffee tomorrow afternoon',
        'Please review the project report and send your feedback',
        'Can you send me the lecture notes for todays class',
        'Mom said dinner is ready come home soon',
        'Thanks for helping with the assignment see you in college',
        'Let us schedule the team meeting for next Monday at 10am'
    ]
}

df = pd.DataFrame(data)

# 2. Text Vectorization using TF-IDF (Feature Extraction)
vectorizer = TfidfVectorizer(stop_words='english', lowercase=True)
X = vectorizer.fit_transform(df['text'])
y = df['label'].map({'ham': 0, 'spam': 1})

# 3. Model Training (Multinomial Naive Bayes)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
classifier = MultinomialNB()
classifier.fit(X_train, y_train)

# 4. Evaluation
predictions = classifier.predict(X_test)
print(f"Model Training Accuracy: {accuracy_score(y_test, predictions) * 100:.2f}%")
print("\nClassification Report:\n", classification_report(y_test, predictions, zero_division=1))

def predict_message(message):
    vec = vectorizer.transform([message])
    result = classifier.predict(vec)[0]
    return "SPAM" if result == 1 else "LEGITIMATE (HAM)"

# Test inference
test_msg = "Claim your free cash prize now!"
print(f"Sample Test: '{test_msg}' -> Prediction: {predict_message(test_msg)}")

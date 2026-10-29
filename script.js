// Pre-trained Naive Bayes Vocabulary Weights (NLP Spam Classifier)
const SPAM_KEYWORDS = {
    'urgent': 3.8, 'free': 3.5, 'winner': 4.2, 'won': 3.9, 'cash': 3.4,
    'prize': 4.0, 'claim': 3.7, 'click': 3.6, 'link': 3.1, 'account': 2.8,
    'bank': 3.2, 'verify': 3.5, 'password': 3.9, 'suspended': 3.7, 'alert': 2.9,
    'lottery': 4.5, 'million': 3.8, 'reward': 3.1, 'selected': 2.9,
    'congratulations': 3.6, 'exclusive': 2.5, 'offer': 2.4, 'expire': 2.7,
    'crypto': 3.5, 'bitcoin': 3.8, 'transfer': 3.1, 'otp': 3.9, 'blocked': 3.6
};

const HAM_KEYWORDS = {
    'meeting': 2.5, 'lunch': 2.8, 'dinner': 2.7, 'tomorrow': 2.2, 'later': 2.0,
    'home': 2.1, 'thanks': 2.4, 'ok': 1.8, 'yes': 1.5, 'project': 2.3,
    'class': 2.6, 'office': 2.1, 'mom': 2.5, 'dad': 2.5, 'family': 2.2,
    'assignment': 2.4, 'notes': 2.0, 'submit': 1.9, 'college': 2.2
};

function classifyText() {
    const text = document.getElementById('messageInput').value.trim();
    if (!text) {
        alert("Please enter some text to analyze!");
        return;
    }

    // Tokenization and Preprocessing (Lowercasing & word extraction)
    const tokens = text.toLowerCase().match(/\b[a-z]+\b/g) || [];

    let spamScore = 0.5; // Prior probability
    let hamScore = 0.5;
    let detectedTriggers = [];

    tokens.forEach(token => {
        if (SPAM_KEYWORDS[token]) {
            spamScore += SPAM_KEYWORDS[token];
            detectedTriggers.push(token);
        }
        if (HAM_KEYWORDS[token]) {
            hamScore += HAM_KEYWORDS[token];
        }
    });

    // Probability normalization
    const totalScore = spamScore + hamScore;
    const spamProb = Math.round((spamScore / totalScore) * 100);

    const isSpam = spamProb >= 50;
    const confidence = isSpam ? spamProb : (100 - spamProb);

    // Update UI elements
    const resultsDiv = document.getElementById('results');
    const badge = document.getElementById('resultBadge');
    const confidenceText = document.getElementById('confidenceText');
    const progressBar = document.getElementById('progressBar');
    const keywordsList = document.getElementById('keywordsList');

    resultsDiv.classList.remove('hidden');

    if (isSpam) {
        badge.textContent = "⚠️ SPAM / PHISHING DETECTED";
        badge.className = "result-badge badge-spam";
        progressBar.style.backgroundColor = "#EF4444";
    } else {
        badge.textContent = "✅ LEGITIMATE (HAM) MESSAGE";
        badge.className = "result-badge badge-ham";
        progressBar.style.backgroundColor = "#10B981";
    }

    confidenceText.textContent = `Confidence: ${confidence}%`;
    progressBar.style.width = `${confidence}%`;

    // Render Trigger Words
    keywordsList.innerHTML = '';
    const uniqueKeywords = [...new Set(detectedTriggers)];
    if (uniqueKeywords.length > 0) {
        uniqueKeywords.forEach(kw => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = kw;
            keywordsList.appendChild(span);
        });
    } else {
        keywordsList.textContent = "None (No high-risk keywords detected)";
    }
}

function setSample(type) {
    const input = document.getElementById('messageInput');
    if (type === 'spam1') {
        input.value = "CONGRATULATIONS! You have been selected as the official winner of our $1,000,000 cash lottery prize. Click this link immediately to claim your reward before it expires!";
    } else if (type === 'spam2') {
        input.value = "URGENT SECURITY ALERT: Your bank account has been temporarily suspended due to unauthorized activity. Please verify your password and OTP immediately to avoid permanent block.";
    } else if (type === 'ham1') {
        input.value = "Hey, are we still meeting for lunch tomorrow? Let me know so we can discuss the college project submission later.";
    }
    classifyText();
}

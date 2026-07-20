# Rate My Excuse


> **📝 Note**
>
> This README is written **before any wireframes, UI designs, or development begin**. It serves as the project's blueprint and may evolve as ideas are refined throughout the design and development process.

---
## Overview

**Rate My Excuse** is an AI-powered conversation game where players must defend their excuses against AI judges with unique personalities.

---

# Purpose

This project is primarily built for learning while creating something fun.

### Goals

* Learn AI APIs
* Learn Prompt Engineering
* Learn Authentication
* Learn Payment Integration
* Learn Rate Limiting
* Improve Full-Stack Development skills

---

# Features

### 🤖 AI Personalities

Each judge has a unique personality, speaking style, and evaluation style, making every conversation feel different.

### 💬 Interactive Conversations

Instead of rating a single excuse, the AI starts a conversation, asks follow-up questions, and reaches its own conclusion.

### 🎲 Random Scenarios

Every game begins with a randomly generated scenario tailored to the selected judge.

### 🏆 Final Verdict

Receive a score (0–100), an in-character response, and a brief explanation of why your excuse succeeded or failed.

### 🔒 Daily Limits

Free users can play a limited number of conversations each day to encourage replayability and reduce AI costs.

### 📺 Advertisements

Watch an ad to unlock additional conversations without purchasing Premium.

### 👤 Accounts

Play instantly as a Guest or create an account to save progress, statistics, and unlock premium features.

### 💎 Premium

Unlock unlimited conversations, remove advertisements, and gain access to exclusive judges and scenarios.

### 📊 Player Statistics

Track games played, highest scores, conversation history, and other personal statistics.

### 🎭 Unlockable Judges

Discover and unlock new personalities as the game grows, ranging from realistic characters to absurd ones.

### 📱 Mobile-First Design

Designed primarily for mobile devices with a clean, chat-style interface that feels like a messaging app.

### ⚡ Fast Gameplay

Each conversation is designed to be short and engaging, making it easy to play multiple rounds in just a few minutes.

### 🔄 Highly Replayable

Different judges, scenarios, conversations, and AI responses ensure that no two games feel exactly the same.

---

# Core Gameplay

1. Select a judge.
2. Receive a randomly generated scenario.
3. The AI starts the conversation.
4. Defend your excuse through a short chat.
5. The AI asks follow-up questions based on your answers.
6. After few messages, the AI ends the conversation and reveals the final verdict.

### Final Verdict

Every game ends with:

* Score (0–100)
* Short in-character reaction
* Breakdown of what made the excuse believable or suspicious

---

# AI Personality System

Every judge has:

* A unique personality
* A different speaking style
* Different evaluation criteria
* Different follow-up questions

### Initial Judges

* 👩‍🏫 Teacher
* 🚔 Police Officer
* ❤️ Partner

### Future Judges

* 👨‍👩‍👧 Parent
* 🤝 Friend
* 💼 Boss
* 💻 Interviewer
* 🧮 Calculator
* 🧙 Wizard
* 🤖 AI Overlord
* 🍕 Pizza Delivery Guy

---

# Conversation System

The conversation is the core gameplay.

The AI should:

* Generate the scenario.
* Start the conversation.
* Ask follow-up questions.
* Detect contradictions.
* React naturally to the user's responses.
* End the conversation when enough information has been gathered.

The conversation should feel like talking to a real person rather than filling out a form.

---

# App Flow

Home

↓

Select Judge

↓

AI Generates Scenario

↓

Chat Conversation

↓

AI Follow-up Questions

↓

Final Verdict

---

# Pages

## 1. Home

### Purpose

Introduce the game and let users start playing.

### Features

* Logo
* Short description
* Play button
* Daily excuse counter
* Premium button

---

## 2. Judge Selection

Choose the AI personality.

### Features

* Judge cards
* Personality preview
* Difficulty (optional)

---

## 3. Chat

The primary gameplay screen.

### Features

* Chat interface
* AI-generated scenario
* User message input
* AI responses
* Typing indicator
* Conversation history

The AI automatically decides when to finish the conversation.

---

## 4. Final Verdict

Displayed after the conversation ends.

### Features

* Overall score
* AI reaction
* Score breakdown

  * Believability
  * Creativity
  * Logic
  * Confidence

### Actions

* Play Again
* Share Result
* Return Home

---

## 5. Daily Limit

Displayed when the user reaches the free limit.

### Free Plan

* 3 conversations per day

### Options

* Wait until reset
* Watch an advertisement
* Upgrade to Premium

---

## 6. Advertisement

Watch an advertisement to unlock another conversation.

### Features

* Advertisement
* Countdown
* +1 conversation

---

## 7. Premium

### Premium Benefits

* Unlimited conversations
* No advertisements
* Exclusive judges
* Exclusive scenarios

---

## 8. Profile

### Features

* Username
* Total conversations
* Highest score
* Match history
* Subscription status
* Settings

---

# Appearance

### Style

* Modern
* Playful
* Minimal
* Chat-first
* Mobile-friendly

### Theme

The app should feel like chatting with entertaining characters rather than using a traditional AI chatbot. The interface should resemble a messaging app while maintaining the energy of a casual party game.

---

# Future Ideas

* Daily challenges
* Leaderboards
* Shareable verdict cards
* Multiplayer battles
* Community-voted excuses
* Unlockable judges
* Seasonal events
* Achievement system
* Custom AI personalities
* Rare hidden judges

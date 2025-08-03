# One Rep Max Tracker 💪📈

A web app that helps users track their strength progress by calculating and visualizing their **One Rep Max (1RM)** over time for any exercise.

# 🧠 What It Does

This app allows users to:

- Input an **exercise**, **weight lifted**, and **number of reps performed**
- Automatically calculate the **One Rep Max (1RM)** using the Epley formula
- **Store and view** 1RM entries over time
- See a **graphical representation** of their strength progression for each exercise

---

## 📊 One Rep Max Formula

We use the **Epley formula** to estimate 1RM:

Example:  
If a user lifts 100 lbs for 5 reps:

Then:
Uses linear regression to calculate the progress over 50 days. Although inaccurate initially, the projection gets better over time

---

## 🖼️ Features

- 🔐 Optional user login for personalized tracking (if using auth)
- 🏋️ Add any custom exercise
- 📈 View 1RM history in a responsive line graph (Recharts, Chart.js, etc.)
- 🧠 Smart input validation and error handling
- ☁️ Data persistence with a backend (MongoDB, PostgreSQL, Firebase, etc.)

---

## 🛠️ Tech Stack

- **Frontend:** React,
- **Backend:** Node.js, Express.js
- **Database:** Postgresql
- **Graphing Library:** Recharts
- **Deployment:** Cloudflare
- **Security and Authenticaion:** JsonWebToken

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm installed
- Postgresql and the Strength-Projector-API (also in my github repositories)

### Installation

git clone https://github.com/your-username/Strength-Projector.git
cd Strength-Projector
npm install
npm run dev

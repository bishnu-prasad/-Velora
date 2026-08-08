<img width="2940" height="1640" alt="Image 05-04-26 at 7 09 PM" src="https://github.com/user-attachments/assets/1986b826-23ce-4391-ab25-acf85b8ed8c6" />
<img width="2920" height="1624" alt="Image 22-04-26 at 10 43 PM (1)" src="https://github.com/user-attachments/assets/9e121d02-1f92-4f35-87e5-43b3489970d1" />
<img width="2892" height="1658" alt="Image 22-04-26 at 10 53 PM" src="https://github.com/user-attachments/assets/a88ce445-c150-4b98-81fe-f541da6bad13" />
<img width="2893" height="1639" alt="Image 22-04-26 at 10 53 PM (1)" src="https://github.com/user-attachments/assets/c5589380-3b06-4f30-a94d-810ed0fd5997" />
<img width="2903" height="1646" alt="Image 22-04-26 at 10 54 PM" src="https://github.com/user-attachments/assets/f2fbc579-a904-44f1-ad7c-55855af278cb" />

# 💰 Velora — Smart Expense Tracking for Modern India

### AI-Powered Personal Expense Management & Financial Insights

[![Python](https://img.shields.io/badge/Python-3.9%2B-3776AB?style=flat-square\&logo=python\&logoColor=white)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18%2B-61DAFB?style=flat-square\&logo=react\&logoColor=black)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=flat-square\&logo=fastapi\&logoColor=white)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square\&logo=mongodb\&logoColor=white)](https://www.mongodb.com/)
[![Scikit--Learn](https://img.shields.io/badge/Scikit--Learn-ML-F7931E?style=flat-square\&logo=scikit-learn\&logoColor=white)](https://scikit-learn.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-UI-06B6D4?style=flat-square\&logo=tailwindcss\&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

**Velora** is an intelligent full-stack expense tracking platform built for modern users in India.

It combines **machine learning, financial analytics, cloud databases, and a modern web interface** to make personal expense management simpler and smarter.

Instead of manually selecting an expense category every time, Velora uses a **TF-IDF-based machine learning pipeline** to automatically understand expense descriptions and predict categories.

> **Example:**
> `pizza from dominos` → 🤖 **Food**

---

# 🌟 Why Velora?

Traditional expense trackers require users to manually categorize every transaction.

Velora simplifies this process.

```text
User enters expense
        ↓
"Pizza from Domino's"
        ↓
TF-IDF Text Processing
        ↓
ML Classification Model
        ↓
Predicted Category
        ↓
Food 🍕
        ↓
Stored in MongoDB
        ↓
Dashboard Analytics
```

The goal is to reduce manual effort while giving users a clear understanding of their spending habits.

---

# ✨ Features

## 🔐 Secure Authentication

* User signup and login
* Password-based authentication
* Protected user data
* Environment-based secret configuration
* User-specific expense records

## 💸 Smart Expense Management

Users can:

* Add expenses
* View expenses
* Categorize expenses
* Track spending
* Manage transaction information

## 🤖 AI-Powered Categorization

Velora automatically predicts expense categories from natural-language descriptions.

### Example

| Expense Description    | Predicted Category |
| ---------------------- | ------------------ |
| `Pizza from Domino's`  | 🍕 Food            |
| `Uber ride to office`  | 🚗 Transport       |
| `Amazon headphones`    | 🛍️ Shopping       |
| `Electricity bill`     | 💡 Utilities       |
| `Netflix subscription` | 🎬 Entertainment   |

The prediction pipeline uses:

```text
Text Input
    ↓
TF-IDF Vectorization
    ↓
Trained Classification Model
    ↓
Category Prediction
```

## 📊 Financial Dashboard

The dashboard provides visual insights into spending patterns using charts and analytics.

Possible insights include:

* Total spending
* Category-wise spending
* Recent transactions
* Spending distribution
* Expense trends

## ☁️ Cloud Database

Velora uses **MongoDB Atlas** for cloud-based data storage.

Benefits include:

* Scalable database
* Cloud accessibility
* Flexible document structure
* Easy integration with FastAPI

## ⚡ FastAPI Backend

The backend provides a high-performance REST API for:

* Authentication
* Expense management
* ML predictions
* Database operations
* Dashboard data

## 📱 Modern Frontend

Built using React and Tailwind CSS with a responsive interface designed for modern devices.

---

# 🧠 Machine Learning

Velora uses Natural Language Processing to understand expense descriptions.

## ML Pipeline

```text
Expense Description
        │
        ▼
┌──────────────────────┐
│     Text Cleaning    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  TF-IDF Vectorizer   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Classification Model │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Expense Category     │
└──────────────────────┘
```

### Technologies

* Scikit-learn
* TF-IDF Vectorizer
* Supervised Classification
* Serialized trained model

The trained ML artifacts are loaded by the FastAPI backend during inference.

---

# 🏗️ System Architecture

```text
                         ┌───────────────────┐
                         │       User        │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │   React Frontend  │
                         │                   │
                         │ Tailwind CSS      │
                         │ Charts / UI       │
                         └─────────┬─────────┘
                                   │
                              HTTP / REST
                                   │
                                   ▼
                         ┌───────────────────┐
                         │  FastAPI Backend  │
                         │                   │
                         │ Pydantic          │
                         │ Authentication    │
                         │ Business Logic    │
                         └───────┬─────┬─────┘
                                 │     │
                    ┌────────────┘     └────────────┐
                    │                               │
                    ▼                               ▼
          ┌───────────────────┐           ┌──────────────────┐
          │ Machine Learning  │           │   MongoDB Atlas  │
          │                   │           │                  │
          │ TF-IDF + Model    │           │ Users            │
          │ Category Predict. │           │ Expenses         │
          └───────────────────┘           └──────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

| Technology   | Purpose                   |
| ------------ | ------------------------- |
| React.js     | Frontend framework        |
| Tailwind CSS | Styling and responsive UI |
| Chart.js     | Data visualization        |
| JavaScript   | Application logic         |

## Backend

| Technology | Purpose            |
| ---------- | ------------------ |
| FastAPI    | REST API framework |
| Pydantic   | Data validation    |
| Uvicorn    | ASGI server        |
| Python     | Backend language   |

## Database

| Technology    | Purpose        |
| ------------- | -------------- |
| MongoDB Atlas | Cloud database |

## Machine Learning

| Technology           | Purpose                 |
| -------------------- | ----------------------- |
| Scikit-learn         | Machine learning        |
| TF-IDF               | Text feature extraction |
| Classification Model | Expense categorization  |

---

# 📂 Project Structure

```text
Velora/
│
├── backend/
│   ├── app/
│   │   ├── ...
│   │
│   ├── model/
│   │   ├── ...
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
├── LICENSE
└── README.md
```

> The exact internal structure may vary depending on the current implementation.

---

# 💻 Prerequisites

Before running Velora locally, install:

| Requirement   | Version               |
| ------------- | --------------------- |
| Python        | 3.9+                  |
| Node.js       | 18+                   |
| npm           | Included with Node.js |
| Git           | Latest recommended    |
| MongoDB Atlas | Cloud account         |

Check installed versions:

```bash
python --version
node --version
npm --version
git --version
```

On macOS/Linux, you may need:

```bash
python3 --version
```

---

# 🚀 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/ExpenseAI.git
cd ExpenseAI
```

> Replace `your-username` with your GitHub username.

---

# 🪟 Windows Setup

## Step 1 — Open PowerShell or Command Prompt

```powershell
cd ExpenseAI
```

## Step 2 — Create a Python Virtual Environment

```powershell
cd backend
python -m venv venv
```

## Step 3 — Activate the Environment

### Command Prompt

```cmd
venv\Scripts\activate
```

### PowerShell

```powershell
.\venv\Scripts\Activate.ps1
```

If PowerShell prevents activation:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then:

```powershell
.\venv\Scripts\Activate.ps1
```

## Step 4 — Install Backend Dependencies

```powershell
python -m pip install --upgrade pip
pip install -r requirements.txt
```

---

# 🍎 macOS Setup

Open Terminal and navigate to the project:

```bash
cd ExpenseAI
```

## Step 1 — Create Virtual Environment

```bash
cd backend
python3 -m venv venv
```

## Step 2 — Activate Environment

```bash
source venv/bin/activate
```

## Step 3 — Upgrade pip

```bash
python3 -m pip install --upgrade pip
```

## Step 4 — Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 🐧 Linux Setup

On Ubuntu/Debian-based distributions, install the required packages:

```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv nodejs npm git
```

Verify:

```bash
python3 --version
node --version
npm --version
git --version
```

Navigate to the project:

```bash
cd ExpenseAI
cd backend
```

Create the virtual environment:

```bash
python3 -m venv venv
```

Activate it:

```bash
source venv/bin/activate
```

Upgrade pip:

```bash
python3 -m pip install --upgrade pip
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

---

# 🔐 Environment Configuration

Velora requires environment variables for sensitive configuration.

Inside the `backend` directory, create:

```text
.env
```

Add:

```env
MONGO_URL=your_mongodb_connection_string
SECRET_KEY=your_secret_key
```

### Example

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/velora
SECRET_KEY=replace_with_a_strong_random_secret
```

> ⚠️ Never commit your `.env` file to GitHub.

Add the following to `.gitignore`:

```gitignore
.env
venv/
__pycache__/
node_modules/
*.pyc
```

---

# ☁️ MongoDB Atlas Setup

Velora uses MongoDB Atlas as its cloud database.

## Step 1

Create a MongoDB Atlas account.

## Step 2

Create a new cluster.

## Step 3

Create a database user.

## Step 4

Configure your network access.

For local development, you may temporarily allow your IP address through the Atlas network settings.

## Step 5

Copy your MongoDB connection string.

It will look similar to:

```text
mongodb+srv://username:password@cluster.mongodb.net/
```

Add it to:

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/velora
```

---

# ⚡ Running the Backend

Navigate to:

```bash
cd backend
```

Activate your virtual environment if it is not already active.

### Windows

```powershell
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

Start FastAPI:

```bash
uvicorn main:app --reload
```

The backend should now be available at:

```text
http://127.0.0.1:8000
```

---

# ⚛️ Running the Frontend

Open a **new terminal**.

Navigate to:

```bash
cd ExpenseAI/frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

If the project uses Vite instead of Create React App:

```bash
npm run dev
```

The frontend will usually be available at:

```text
http://localhost:3000
```

or:

```text
http://localhost:5173
```

depending on the frontend configuration.

---

# ▶️ Run Velora Locally

You need two terminals.

### Terminal 1 — Backend

```bash
cd ExpenseAI/backend
```

Activate your virtual environment.

Then:

```bash
uvicorn main:app --reload
```

### Terminal 2 — Frontend

```bash
cd ExpenseAI/frontend
npm install
npm start
```

Open the frontend URL displayed in your terminal.

---

# 📊 API Documentation

Velora's FastAPI backend automatically provides interactive API documentation.

Once the backend is running:

### Swagger UI

```text
http://127.0.0.1:8000/docs
```

### ReDoc

```text
http://127.0.0.1:8000/redoc
```

Swagger allows you to test API endpoints directly from your browser.

---

# 🔌 API Workflow

A typical expense request follows this process:

```text
POST Expense
      │
      ▼
FastAPI
      │
      ▼
Validate Request
      │
      ▼
ML Category Prediction
      │
      ▼
Store Expense
      │
      ▼
MongoDB
      │
      ▼
Dashboard Analytics
```

---

# 🤖 Example ML Prediction

### Input

```json
{
  "description": "pizza from dominos",
  "amount": 450
}
```

### ML Processing

```text
"pizza from dominos"
        ↓
TF-IDF Vectorizer
        ↓
Classification Model
        ↓
"Food"
```

### Result

```json
{
  "category": "Food"
}
```

---

# 🔒 Security

Velora follows basic security practices for local development.

### Sensitive information

The following should never be committed:

```text
.env
MongoDB credentials
Secret keys
Private API keys
User passwords
```

### Recommended `.gitignore`

```gitignore
# Environment
.env
.env.*

# Python
venv/
__pycache__/
*.pyc

# Node
node_modules/
dist/
build/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

> For production deployment, additional security measures such as HTTPS, secure authentication, rate limiting, password hashing, input sanitization, and proper secret management should be implemented.

---

# 📈 Dashboard

The Velora dashboard is designed to help users understand their spending patterns.

Potential dashboard metrics include:

```text
┌────────────────────────────────────────┐
│              Total Spending            │
│                 ₹25,450                │
└────────────────────────────────────────┘

┌─────────────────┐  ┌──────────────────┐
│ 🍕 Food         │  │ 🚗 Transport     │
│ ₹8,200          │  │ ₹4,500           │
└─────────────────┘  └──────────────────┘

┌─────────────────┐  ┌──────────────────┐
│ 🛍️ Shopping     │  │ 💡 Utilities     │
│ ₹6,200          │  │ ₹2,850           │
└─────────────────┘  └──────────────────┘
```

Charts can be used to visualize:

* Category distribution
* Monthly spending
* Daily expenses
* Spending trends
* Top expense categories

---

# 🚀 Deployment

Velora can be deployed using a modern cloud architecture.

### Recommended Architecture

```text
                    Internet
                       │
                       ▼
              ┌─────────────────┐
              │     Vercel      │
              │ React Frontend  │
              └────────┬────────┘
                       │
                     HTTPS
                       │
                       ▼
              ┌─────────────────┐
              │     Render      │
              │ FastAPI Backend │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │  MongoDB Atlas  │
              │    Database     │
              └─────────────────┘
```

### Frontend

Recommended:

```text
Vercel
```

### Backend

Recommended:

```text
Render
```

### Database

```text
MongoDB Atlas
```

---

# 🧪 Development

Before submitting changes, verify:

### Backend

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
npm install
npm start
```

### API

Open:

```text
http://127.0.0.1:8000/docs
```

Test authentication, expense creation, ML categorization, and dashboard endpoints.

---

# 🗺️ Roadmap

## Current

* [x] User authentication
* [x] Expense management
* [x] MongoDB integration
* [x] Machine learning categorization
* [x] TF-IDF text processing
* [x] FastAPI backend
* [x] React frontend
* [x] Dashboard analytics

## Planned

* [ ] JWT-based authentication
* [ ] Budget management
* [ ] Monthly budget alerts
* [ ] Recurring expenses
* [ ] CSV export
* [ ] PDF financial reports
* [ ] Advanced spending insights
* [ ] Better ML model accuracy
* [ ] Personalized financial recommendations
* [ ] Mobile application
* [ ] Docker support
* [ ] Automated CI/CD
* [ ] Production monitoring

---

# 🤝 Contributing

Contributions are welcome!

## 1. Fork the Repository

```bash
git clone https://github.com/your-username/ExpenseAI.git
cd ExpenseAI
```

## 2. Create a Branch

```bash
git checkout -b feature/your-feature
```

## 3. Make Your Changes

Implement and test your changes locally.

## 4. Commit

```bash
git add .
git commit -m "Add: your feature"
```

## 5. Push

```bash
git push origin feature/your-feature
```

## 6. Create a Pull Request

Open a Pull Request on GitHub and describe your changes.

---

# 🐛 Issues & Suggestions

If you find a bug or have an idea for improving Velora, feel free to open a GitHub issue.

When reporting a bug, include:

* Operating system
* Python version
* Node.js version
* Steps to reproduce
* Error message
* Relevant screenshots or logs

---

# 👨‍💻 Author

## Bishnuprasad Tripathy

Built with ❤️ using:

**React · FastAPI · MongoDB · Scikit-learn · Tailwind CSS**

---

# 📄 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for more information.

---

# ⭐ Support Velora

If you like this project, consider supporting it by:

⭐ **Starring the repository**

🍴 **Forking the project**

🐛 **Reporting bugs**

💡 **Suggesting improvements**

🤝 **Contributing**

---

<div align="center">

### 💰 Velora

**Smart Expense Tracking for Modern India**

*Track smarter. Spend better. Understand your money.*

Made with ❤️ by **Bishnuprasad Tripathy**

</div>









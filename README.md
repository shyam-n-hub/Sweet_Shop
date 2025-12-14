# 🍬 Sweet Shop Management System

A full-stack **Sweet Shop Management System** built using **React (Vite)** for the frontend and **Spring Boot (Java)** for the backend.  
The application supports **JWT-based authentication**, **role-based access control (Admin/User)**, and **real-time inventory management**.

---

## 📌 Project Overview

The Sweet Shop Management System is designed to digitize and simplify sweet shop operations.  
It provides separate interfaces for **customers (users)** and **administrators**, ensuring secure access and efficient management.

### 👤 User Capabilities
- Register and login securely
- View available sweets
- Search and filter sweets
- Purchase sweets (disabled automatically if out of stock)

### 🛠️ Admin Capabilities
- Secure admin login
- Add new sweets
- Update and delete sweets
- Manage inventory effectively

The system follows **clean architecture principles** and simulates a **real-world production-ready application**.

---

## 🧱 Tech Stack

### Frontend
- React.js (Vite)
- JavaScript (ES6+)
- Axios
- JWT Authentication
- React Router DOM

### Backend
- Java
- Spring Boot
- Spring Security
- JWT (JSON Web Token)
- MongoDB (MongoDB Compass)

---

## 🏗️ Architecture

### Backend (Spring Boot)
- **Controller Layer** – Handles API requests
- **Service Layer** – Business logic
- **Repository Layer** – Database access
- **Security Layer** – JWT filters, authentication & authorization

### Frontend (React)
- Component-based architecture
- Context API for authentication
- Role-based routing and navigation
- Auto-switching navbar (Public / User / Admin)

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Single login & registration page
- Backend determines user role (Admin/User)
- Frontend redirects users automatically based on role
- Secured admin-only and user-only routes

---

## 🤖 AI Usage

### AI Tools Used
- **ChatGPT (OpenAI)**
- **Claude (Anthropic)**

### How AI Was Used

- **ChatGPT** was used to:
  - Design and plan application functionalities
  - Structure frontend components and routing logic
  - Understand and implement **JWT-based authentication** in the backend using Spring Boot
  - Improve code readability and follow best practices
  - Assist in writing clear and professional README documentation

- **Claude** was used to:
  - Debug frontend and backend integration issues
  - Identify and fix runtime and logic errors in the application
  - Analyze error messages and suggest corrective solutions during development
---

# ⚙️ Backend Installation & Setup Guide  
(Spring Boot + MongoDB + JWT)

This guide explains how to set up and run the **backend service** of the Sweet Shop Management System on a local machine.

---

## 📋 Prerequisites

Before starting, make sure the following are installed:

- **Java JDK 17 or above**
- **Maven**
- **MongoDB**
- **MongoDB Compass** (optional but recommended)
- **IntelliJ IDEA / Eclipse / VS Code**

Check versions:
```bash
java -version
mvn -version
```    
## 📂 Clone the Repository
```bash
git clone https://github.com/shyam-n-hub/sweet_shop.git
cd sweet_backend/sweet
```

## ⚙️ Configure Application Properties
Open the file: src/main/resources/application.properties
Add or update the following: 
```bash
spring.data.mongodb.uri=mongodb://localhost:27017/sweetshop
spring.data.mongodb.database=sweetshop

jwt.secret=MyVerySecureSweetShopSecretKeyThatIsAtLeast32CharactersLong!@#$%
jwt.expiration=86400000

server.port=8080
```
## 🗄️ Start MongoDB - Using MongoDB Compass

Open MongoDB Compass
Connect to: mongodb://localhost:27017
The database sweetshop will be created automatically when the app runs

## ▶️ Run the Spring Boot Application
Using Maven (Recommended)
mvn spring-boot:run

## 🌐 Backend Server Details
Once started successfully, the backend will be available at: http://localhost:8080

# 🌐 Frontend Installation & Setup Guide  
(React.js + Vite + JWT)

This guide explains how to set up and run the **frontend application** of the Sweet Shop Management System on a local machine.

---

## 📋 Prerequisites

Before starting, make sure the following are installed:

- **Node.js (v18 or above recommended)**
- **npm** or **yarn**
- A modern web browser (Chrome, Edge, Firefox)
- Code editor (VS Code recommended)

Check versions:
```bash
node -v
npm -v
```
## 📂 Clone the Repository
```bash
git clone https://github.com/shyam-n-hub/sweet_shop.git
cd sweet_frontend/sweet
```
## 📦 Install Dependencies
Install all required packages:
npm install
This will install React, Vite, Axios, React Router DOM, and other dependencies.

## ▶️ Run the Frontend Application
Start the development server:
npm run dev

## 🌐 Frontend Server Details
Once started successfully, the application will be available at:
http://localhost:5173

## 🔑 Demo Admin Credentials

Use the following credentials to log in as an **Admin** for testing and evaluation purposes:

- **Email:** `testadmin@gmail.com`
- **Password:** `password123`

## 📸 Output Screenshots

Below are screenshots of the Sweet Shop Management System in action.

### 🏠 Home Page
<img width="1912" height="850" alt="image" src="https://github.com/user-attachments/assets/24ad6dc3-6f74-4350-81f3-15cebaf5a6eb" />

### 🔐 Login Page
<img width="1841" height="796" alt="image" src="https://github.com/user-attachments/assets/d773abdd-0939-4314-81d4-3c56a3d24144" />

### 📝 Register Page
<img width="1811" height="837" alt="image" src="https://github.com/user-attachments/assets/2491034c-31d7-4842-8f8e-6433f6eefbe3" />

### 👤 User Dashboard
<img width="1866" height="853" alt="image" src="https://github.com/user-attachments/assets/6e0a9c35-2d7c-47ae-912b-a0cadadf34df" />

### 🛠️ Admin Dashboard
<img width="1879" height="847" alt="image" src="https://github.com/user-attachments/assets/fa614e89-a993-48be-836e-ddee10a704f7" />

### 🍬 Manage Sweets (Admin)
<img width="1863" height="842" alt="image" src="https://github.com/user-attachments/assets/4a73e4e8-e458-437c-9443-c7fcd418b450" />

<img width="1859" height="837" alt="image" src="https://github.com/user-attachments/assets/d7eaca83-0d24-46d0-9f6b-77464a6887ac" />


## ✅ Conclusion

The Sweet Shop Management System successfully demonstrates the development of a **real-world full-stack web application** using modern technologies and best practices.  
By integrating **React.js (Vite)** on the frontend with **Spring Boot, JWT authentication, and MongoDB** on the backend, the project ensures secure, scalable, and maintainable application architecture.

The implementation of **role-based access control** enables clear separation between user and admin functionalities, improving security and usability.  
Features such as dynamic dashboards, inventory validation during purchase, and secure API communication reflect practical business requirements.

Overall, this project highlights strong proficiency in **frontend development**, **backend API design**, **authentication mechanisms**, and **clean coding practices**, making it a solid portfolio project suitable for **Web Developer**, **Full Stack Developer**, and **Java + React** roles.


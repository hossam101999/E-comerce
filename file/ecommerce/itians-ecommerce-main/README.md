# ITIANS ELECTRONICS

Welcome to **ITIANS ELECTRONICS** - your ultimate online electronics store! Built with modern technologies like Angular, Node.js, Express, and TypeScript, our platform offers a seamless shopping experience, featuring a fully responsive design and secure payment options.

![Angular](https://img.shields.io/badge/Frontend-Angular-DD0031?logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Framework-Express-000000?logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Payment-Stripe-008CDD?logo=stripe&logoColor=white)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Future Features](#future-features)

## Features

### 🎨 Responsive Design

- Fully responsive design to ensure a great experience on any device.

### 🔒 Secure Payment Gateway

- Integrated with **Stripe** for secure payments.
- Future integration with **Paymob** to support Fawry and Vodafone Cash payments.

### 🛒 Advanced Cart Management

- Real-time synchronization of cart items with the backend.

### ❤️ Favorite Products

- Easily add and manage your favorite products.

### 📊 Admin Dashboard

- A feature-rich **Admin Dashboard** for managing products, orders, users, and more.
- Access the Admin Dashboard here: [Admin Dashboard](https://admin-dashboard-itians-ecommerce.vercel.app)

### 🛡️ User Authentication & Authorization

- Secure authentication using JWT tokens.
- Role-based access control to ensure proper authorization.

### 🔍 Product Search & Filtering

- Advanced search and filtering options to help users find what they need quickly.

## Installation

### Prerequisites

- **Node.js** (v14 or later)
- **Angular CLI**
- **MongoDB**

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Ebrahimsamad/ITIANS-ELECTRONICS.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd ITIANS-ELECTRONICS
   ```

3. **Install dependencies for both frontend and backend:**

   ```bash
   npm install
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

4. **Set up environment variables by creating a `.env` file in the `backend` directory:**

   ```env
   MONGODB_URI=your_mongo_uri
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

5. **Start the application:**

   ```bash
   npm run start
   ```

6. **Navigate to `http://localhost:4200` in your browser to view the frontend.**

## Usage

### Running in Development

- **Frontend:**

  ```bash
  cd frontend
  ng serve
  ```

- **Backend:**
  ```bash
  cd backend
  npm run dev
  ```

### Running in Production

- **Build the frontend and start the backend:**
  ```bash
  cd frontend
  ng build --prod
  cd ../backend
  npm start
  ```

## API Documentation

### Authentication

- **POST** `/signup` - User signup
- **POST** `/login` - User login

### Products

- **GET** `/products` - Get all products
- **GET** `/products/:id` - Get product by ID
- **POST** `/products` - Create a new product (Admin only)

### category

- **GET** `/category` - Get user category
- **POST** `/category` - Add item to category
- **DELETE** `/category/:itemId` - Remove item from category

### Payment

- **POST** `/checkout` - Process payment through Stripe

## Contributing

We welcome contributions! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License.

## Future Features

### 🆕 Paymob Integration

- Support payments via **Fawry** and **Vodafone Cash** through **Paymob**.

### 📱 Progressive Web App (PWA)

- Transform the site into a PWA for offline access and enhanced mobile experience.

### 🗺️ Location-Based Services

- Offer location-based services for personalized recommendations and delivery options.

## API Documentation

### Authentication

- **POST** `/api/auth/signup` - User signup
- **POST** `/api/auth/login` - User login

### Products

- **GET** `/api/products` - Get all products
- **GET** `/api/products/:id` - Get product by ID
- **POST** `/api/products` - Create a new product (Admin only)

### Cart

- **GET** `/api/cart` - Get user cart
- **POST** `/api/cart` - Add item to cart
- **DELETE** `/api/cart/:itemId` - Remove item from cart

### Payment

- **POST** `/api/checkout` - Process payment through Stripe

## Contributors

### Lead Developer

- **Ebrahim Samad** - [GitHub Profile](https://github.com/Ebrahimsamad)

### Contributors

- **Mohamed Hesham** - [GitHub Profile](https://github.com/MohamedHesham45)
- **Amr Kataria** - [GitHub Profile](https://github.com/Amrkataria)
- **Hossam Salah** - [GitHub Profile](https://github.com/hossam101999)
- **Fatma Youssef** - [GitHub Profile](https://github.com/FatmaYoussef3)

We are always looking for talented developers to join our project. Feel free to fork the repository and submit a pull request.

## Future Features

### 🆕 Paymob Integration

- **Fawry & Vodafone Cash**: Expand payment options to include Fawry and Vodafone Cash via Paymob, enhancing payment flexibility for users.

### 📱 Progressive Web App (PWA)

- **Offline Access**: Transform the site into a Progressive Web App (PWA) for offline access and enhanced mobile experience.

### 📊 Advanced Admin Dashboard

- **Real-Time Analytics**: An advanced admin dashboard with real-time analytics, sales tracking, and inventory management.

### 🗺️ Location-Based Services

- **Personalized Recommendations**: Offer location-based services for personalized recommendations and delivery options.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

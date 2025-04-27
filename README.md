# Ecommerce Admin Panel

## Introduction

This project is a **Fullstack Ecommerce Admin Panel** that allows users (admins) to manage categories and products. Admins can **create, edit, and delete categories** and **manage products** inside those categories.  
The purpose is to provide a simple, clean interface to manage an ecommerce backend easily.

## Project Type

Fullstack

## Directory Structure

```
my-app/
├─ backend/
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  ├─ server.js
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ App.jsx
│  │  ├─ main.jsx
│  ├─ public/
```

## Features

- Add new categories
- Edit existing categories
- Delete categories
- Add products to a category
- Edit and delete products
- Responsive admin dashboard UI
- Basic authentication for admin access

## Design Decisions or Assumptions

- RESTful API design
- MongoDB used for easy document storage
- No user-facing storefront (admin-only interface)
- Basic validation on input forms
- No image upload functionality (only text and price-based products)

## Installation & Getting Started

```bash
# Clone the repo
git clone https://github.com/sudhirbhargav/B44_WEB_046

# Install frontend dependencies
cd ./frontend
npm install
npm run dev

# Install backend dependencies
cd ./backend
npm install
npm run start
```

Make sure MongoDB is running locally or set up a MongoDB Atlas connection.

## Usage

Once installed:

- Go to `http://localhost:5173` (frontend)
- Access your admin panel
- Start creating, editing, and deleting categories and products

Include screenshots if needed to show category and product modals.

## APIs Used

No external APIs used — only internal backend APIs.

## API Endpoints

Here are the main backend endpoints:

| Endpoint              | Method | Description           |
| :-------------------- | :----- | :-------------------- |
| `/api/categories`     | GET    | Fetch all categories  |
| `/api/categories`     | POST   | Create a new category |
| `/api/categories/:id` | PUT    | Update a category     |
| `/api/categories/:id` | DELETE | Delete a category     |
| `/api/products`       | GET    | Fetch all products    |
| `/api/products`       | POST   | Create a new product  |
| `/api/products/:id`   | PUT    | Update a product      |
| `/api/products/:id`   | DELETE | Delete a product      |

## Technology Stack

- **Frontend:** Vite + React.js
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas
- **Styling:** Tailwind CSS
- **Other libraries:**
  - Axios for HTTP Requests
  - Mongoose for MongoDB ODM

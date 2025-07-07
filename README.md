# Central Pets - Pet Accessories Store

A complete, responsive, and modern e-commerce platform for pet accessories built with React, Vite, and TypeScript.

## Features

### 🎯 Core Functionality
- **Multi-role System**: Customer and Admin roles with protected routes
- **Product Management**: Complete CRUD operations for products
- **Shopping Cart**: Add, remove, and update quantities
- **User Authentication**: Secure login and registration
- **Order Management**: Track orders and purchase history
- **Responsive Design**: Mobile-first design that works on all devices
- **Likes System**: Save favorite products

### 🛍️ E-commerce Features
- Product catalog with search and filtering by species
- Category-based product organization
- Shopping cart with persistent storage
- User profiles with purchase history
- Admin dashboard with sales metrics
- Species-specific product filtering (Dogs, Cats, Rabbits, Birds, Fish, Reptiles, Others)

### 🎨 Design Elements
- Colorful, pet-friendly design aesthetic
- Smooth animations and hover effects
- Modern UI components with Tailwind CSS
- Professional typography and spacing
- Comprehensive color system

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **HTTP Client**: Fetch API with custom wrapper

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd central-pets
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your API configuration:
```
VITE_API_URL=http://localhost:3000/api
```

5. Start the development server:
```bash
npm run dev
```

## Backend Integration

The frontend is ready to connect to a backend API. The expected API endpoints are:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get products with filtering
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin)

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status (admin)

### Likes
- `GET /api/likes` - Get user likes
- `POST /api/likes` - Add product to likes
- `DELETE /api/likes/:productId` - Remove product from likes

### Admin
- `GET /api/admin/stats` - Get admin dashboard stats
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

### Contact
- `POST /api/contact` - Send contact message

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Layout components (Header, Footer)
│   ├── UI/            # Base UI components (Button, Input, Card)
│   └── ProductCard.tsx # Product-specific components
├── pages/              # Page components
├── store/              # Zustand stores
├── types/              # TypeScript type definitions
├── lib/                # Utility functions and API client
└── App.tsx            # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Species Categories

The application supports the following pet species:
- **Perros** (Dogs)
- **Gatos** (Cats)
- **Conejos** (Rabbits)
- **Aves** (Birds)
- **Peces** (Fish)
- **Reptiles** (Reptiles)
- **Otros** (Others - hamsters, guinea pigs, etc.)

## Product Categories

- **Alimentos**: Food products (kibble, treats, bones)
- **Accesorios**: Accessories (clothing, ID tags, leashes)
- **Mobiliario**: Furniture (houses, beds, cages, carriers)
- **Juguetes**: Toys for pets
- **Higiene**: Hygiene products (litter, deodorizers, shampoos)
- **Fancy-Pets**: Premium product line

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Central Pets
VITE_APP_VERSION=1.0.0
```

## Backend Requirements

To fully integrate this frontend, you'll need a backend that provides:

1. **User Authentication**: JWT-based authentication system
2. **Database**: PostgreSQL or similar with the following tables:
   - users
   - products
   - categories
   - orders
   - order_items
   - likes
   - contact_messages

3. **File Upload**: For product images
4. **Email Service**: For contact form and notifications

## Deployment

The application is ready for deployment on platforms like:
- Vercel
- Netlify
- Railway
- Heroku

Make sure to set up the environment variables in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
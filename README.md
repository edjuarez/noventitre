# 👜 Noventitre — Premium E-Commerce Platform

A modern e-commerce platform built for handcrafted bags and accessories.

Designed with a strong focus on performance, scalability and clean UI, featuring a complete custom CMS, Stripe payments, Supabase backend and automated order management.

---

## ✨ Features

### 🛍️ Storefront

- Responsive product catalog
- Product detail pages
- Multiple images per product
- Product gallery with thumbnails
- Shopping cart
- Stripe Checkout integration
- Order confirmation page
- Email notifications
- Smooth animations with Framer Motion

---

### 💳 Checkout

Secure checkout powered by Stripe.

Features include:

- Stripe Checkout Session
- Customer information
- Shipping address collection
- Payment confirmation
- Order creation
- Automatic stock update
- Confirmation emails
- Success page

---

### 📦 Order Management

Orders are automatically generated after successful payment.

Each order stores:

- Customer information
- Shipping address
- Purchased products
- Individual prices
- Total amount
- Payment status
- Stripe Session ID

---

### 📧 Email Automation

Powered by **Resend**

Automatic emails include:

- Purchase confirmation
- Order summary
- Shipping information
- Customer details
- Purchased products

---

### 🔐 Admin Dashboard

Custom CMS built specifically for the project.

Includes:

- Product management
- Create products
- Edit products
- Delete products
- Upload multiple images
- Inventory management
- Featured products
- Visibility control

Order management:

- View all orders
- Customer information
- Shipping address
- Purchased products
- Payment information
- Order totals

---

## 🚀 Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React

### Backend

- Supabase
- PostgreSQL
- Storage
- Authentication
- Edge Functions

### Payments

- Stripe Checkout
- Stripe Webhooks

### Email

- Resend

---

# 🏗 Architecture

```
React
     │
     ▼
Services Layer
     │
     ▼
Supabase
 ├── Database
 ├── Storage
 ├── Auth
 └── Edge Functions
           │
           ├──────── Stripe
           │
           └──────── Resend
```

---

# 📁 Project Structure

```
src
│
├── assets
├── components
│   ├── admin
│   ├── cart
│   ├── checkout
│   ├── product
│   └── ui
│
├── context
│
├── hooks
│
├── pages
│
├── services
│
├── types
│
├── utils
│
├── App.tsx
└── main.tsx
```

---

# 🛒 Shopping Flow

```
Product

↓

Add to Cart

↓

Cart Drawer

↓

Checkout

↓

Stripe Checkout

↓

Payment

↓

Stripe Webhook

↓

Create Order

↓

Update Stock

↓

Send Confirmation Email

↓

Success Screen
```

---

# 💾 Database

Main tables:

### products

Stores:

- Product information
- Price
- Images
- Stock
- Category
- Visibility
- Featured

---

### orders

Stores:

- Customer
- Shipping Address
- Stripe Session
- Status
- Total
- Email
- Payment Information

---

### order_items

Stores:

- Product
- Quantity
- Unit Price
- Order Reference

---

# 🔄 Payment Flow

```
Customer

↓

Checkout

↓

Stripe Session

↓

Stripe Payment

↓

Webhook

↓

Verify Payment

↓

Create Order

↓

Update Inventory

↓

Send Email

↓

Return Success Page
```

---

# 📦 Supabase

The project uses Supabase as a Backend-as-a-Service.

### Database

- PostgreSQL
- Row Level Security
- Relationships
- Foreign Keys

### Storage

- Product images
- Public buckets

### Authentication

Admin authentication using Supabase Auth.

Protected routes:

```
/admin
```

---

# 🎨 UI Design

The interface follows an editorial / premium aesthetic inspired by luxury brands.

Main characteristics:

- Large photography
- Soft neutral palette
- Handmade feeling
- Editorial typography
- Minimal animations
- Geometric decorations
- Responsive layout

---

# ⚡ Performance

Optimizations include:

- Lazy image loading
- Optimized WebP assets
- React memoization
- Local cart persistence
- Skeleton loading states
- Vite production build

---

# 📱 Responsive Design

Optimized for:

- Mobile
- Tablet
- Desktop

---

# 🔮 Future Improvements

- Wishlist
- User accounts
- Order history
- Discount coupons
- Product reviews
- Search
- Product filters
- Analytics dashboard
- Multiple payment methods
- International shipping

---
# Author

Developed by Eduardo Juarez

Frontend Engineer • Roku Developer
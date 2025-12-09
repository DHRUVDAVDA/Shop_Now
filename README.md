# hop Now App

A React Native shopping application built with clean UI, mock authentication, cart flow, and order management using AsyncStorage.

## Features

### Authentication

- Mock login
- Auto login using stored token
- Login required only when placing an order
- Guest user support

**Mock Credentials:**
Email: test@zignuts.com / practical@zignuts.com
Password: 123456

### Product Flow

- Product list fetched from:
  https://fakestoreapi.com/products

- Product details screen
- Add/remove items to cart
- Quantity management

### Order Management

- Users add products to the cart, which is managed using **Redux Toolkit**
- Cart item quantity can be increased or decreased from the cart screen
- During **Checkout**, cart data from Redux is converted into an order
- Orders are saved in **AsyncStorage** for persistence
- **My Orders** screen displays all previously placed orders
- Orders remain available even after app restart

## Architecture Overview

- **Redux Toolkit** → Handles cart and in-session state
- **AsyncStorage** → Persists order history
- **React Navigation** → Screen & tab navigation

## Setup & Run Instructions

- yarn install
- cd ios
  pod install
  cd ..
- yarn android
- yarn ios
# Shop_Now

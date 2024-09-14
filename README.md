# Simple Dashboard

## Overview

This project is a simple web application designed as a dashboard with user management capabilities. It includes basic authentication (registration and login), a calculation feature, and role-based access control for managing registered users.
## Features

- **Registration Page**: Allows new users to create accounts.
- **Login Page**: Authenticates existing users Provides secure access to the dashboard.
- **Calculation Page**: Offers a functionality for performing calculations Available to all authenticated users. 
- **Registered Users Page**: Displays a list of all registered users.
- **Role Assignment Page**: Allows administrators to assign roles to registered users.

## Project Structure

The project is organized into two main folders:

- **`client`**: Contains the frontend application code.
- **`server`**: Contains the backend API code.

## Setup Instructions

### Client

1. Navigate to the `client` directory.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the application:
    ```bash
    npm start
    ```

### Server

1. Navigate to the `server` directory.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the server:
    ```bash
    npm start
    ```

## Environment Variables

Set up the environment variables in the `.env` files for both client and server.

### Client (`client/.env`)

```env
VITE_SERVER_URL=http://your_server_url

```

### Server (`server/.env`)

```env
PORT=your_server_runging_port

CLIENT_URL=your_client_port
MONGO_URL=your_mongodb_coonect_url

JWT_SECRET_KEY=your_jwt_secret_key
JWT_EXPIRES=your_jwt_token_expires_time

SMTP_HOST=your_email_host
SMTP_SERVICE=your_email_service
SMTP_PORT=your_protocoal_port
SMTP_USER=your_email_id
SMTP_PASS=your_email_id_password

```


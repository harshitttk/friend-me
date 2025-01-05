# Friend Me Application 👥

This is a full-stack application for user management, featuring a secure authentication system, friend management, and user search functionality. It includes:


## Features

- Backend API using Node.js, Express, MongoDB, and JWT for authentication.
- Frontend using React (Vite), Tailwind CSS, and React Hot Toast for a responsive and interactive user interface.
- Features like user registration, login, friend management, and logout.

## Live Demo

**URL:** https://friend-me-ui.vercel.app

## Tech Stack

**React.js:** Frontend library to create user-interface

**Node.js:** Backend runtime environment

**Express.js:** Web framework for routing and middleware handling.

**MongoDB:** NoSQL database for storing trades, cargo, and inventory.

**Mongoose:** MongoDB ODM for structured schema and data validation.



## Installation

**Prerequisites**
- Node.js (version 12.x or higher)
- MongoDB (Local instance or MongoDB Atlas)
- NPM (Comes with Node.js)

**Setup Instructions**
- Clone the repository:

```bash
  git clone https://github.com/harshitttk/friend-me.git
  cd friend-me

```

- Install dependencies:

```bash
  npm install
```

- Configure environment variables: Create a .env file in the root directory and add the following variables

```bash
  MONGO_URI=mongodb://localhost:27017/friend-me
  PORT=5000
```

- Start the server:
    
```bash
  nodemon server.js
```

The backend will now run at http://localhost:5000.

## Feedback

Feel free to fork this project and contribute! For any issues or feature requests, please open an issue in the repository.

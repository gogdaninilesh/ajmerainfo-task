# Coding Assessment By Nilesh Gogdani

## Overview
This project is a coding assessment for a Senior Node.js Developer position. It tests proficiency in backend development using Node.js, and Express.

## Tech Stack
- *Node.js* – Backend runtime environment
- *Express.js* – Web framework for Node.js
- *MySQL* – ODM for Sequalize
- *JWT* – Authentication
- *Jest/Mocha* – Testing framework

## Installation & Setup

1. *Clone the repository:*
   
   git clone https://github.com/gogdaninilesh/ajmerainfo-task.git
   cd ajmerainfo-task
   

2. *Install dependencies:*
   
   npm install
   

3. *Set up environment variables:*
   Create a `.env.development` file in the root directory and add required configuration keys, such as:
   env
   DB_NAME=DNNAME
   DB_USERNAME=DBUSERNAME
   DB_PASSWORD=DBPASS
   DB_HOST=DB HOST
   DB_PORT=3306
   PORT=3002
   JWT_SECRET_KEY=ajm#security$2026
   JWT_EXPIRES=24h
   IMG_URl=http://localhost:3002
   

4. *Run the application:*
   
   node index.js
   

5. *Run in production mode:*
   
   NODE_ENV=production node index.js
   

## Features
- User authentication (JWT-based)
- CRUD operations for resources
- Middleware for error handling and request validation
- API security measures (CORS)
- Unit and integration testing

## API Endpoints
Example endpoints (modify based on actual implementation):

### Authentication
- `POST /api/v1/user` – Register a new user
- `POST /api/login` – Authenticate a user

### User Management
- `GET /api/v1/user` – Fetch all users
- `PUT /api/v1/user/:id` – Update a specific user
- `DELETE /api/user/:id` – Remove a user

## Testing
Run tests using:

npm test


## Contributing
Feel free to fork this repo and submit pull requests.

## License
This project is licensed under the MIT License.


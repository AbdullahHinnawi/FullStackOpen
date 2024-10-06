# Express application

Install dependencies with `npm install`

Run with `npm start`

Or in development mode with `npm run dev`

# Visit counter

When running the server, visit http://localhost:3000 to see visit counter, or give environment variable `PORT` to change the port.

# MongoDB

The application has /todos crud which requires a MongoDB. Pass connection url with env `MONGO_URL`

For example: "MONGO_URL=mongodb://the_username:the_password@localhost:3456/the_database npm run dev"

# Redis

Pass connection url with env `REDIS_URL`

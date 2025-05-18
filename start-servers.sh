#!/bin/bash

# Kill any existing Node.js processes
echo "Stopping any existing Node.js processes..."
pkill -f "node" || true

# Start the backend server in the background
echo "Starting backend server..."
cd server && node index.js &

# Wait for the server to start and write the port number
sleep 5

# Read the port number from the file
if [ -f "server-port.txt" ]; then
  PORT=$(cat server-port.txt)
  echo "Backend server is running on port $PORT"
  
  # Update the frontend's API URL
  echo "Updating frontend configuration to use port $PORT..."
  sed -i '' "s|http://localhost:[0-9]\+/api/v1|http://localhost:$PORT/api/v1|" src/services/apiConnector.js
  
  # Start the frontend development server
  echo "Starting frontend development server..."
  cd ..
  npm start
else
  echo "Error: Could not determine backend server port"
  exit 1
fi

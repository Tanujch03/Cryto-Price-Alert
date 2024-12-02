# Crypto Price Alert
The Crypto Price Alert application monitors cryptocurrency prices in real-time and triggers an email notification when a user’s target price is reached.

# Frontend

```
this is used for running the frontend server:
npm run dev
```

# Backend
## Routes
```
POST /api/users/register - used for registering 

POST /api/users/signin  - used for signing in

POST /api/alerts/set-alert - used for setting up the alarm

PUT /api/alerts/history - used for getting the history.
```

## .ENV
```
PORT = 3001
DATABASE_URL=""
EMAIL_USER=""
EMAIL_PASS=""

QUEUE_NAME = ""
RABBIT_URL = ""
JWT_SECRET = ""
```


# Crypto Price Alert
The Crypto Price Alert application monitors cryptocurrency prices in real-time and triggers an email notification when a user’s target price is reached.

# Frontend

```
this is used for running the frontend server
npm run dev
```

# Backend
## Routes
```
POST /api/users/register

POST /api/users/signin

POST /api/alerts/set-alert

PUT /api/alerts/history
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


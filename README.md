# React Login API

A beginner-friendly login practice project with a React and Vite frontend styled with Tailwind CSS, and a Node.js/Express backend. The frontend sends login details to the backend with Axios and displays the response.

> **Practice only:** the demo credentials are fixed in the backend. This is not production authentication and should not be used to protect real accounts or data.

## Features

- Responsive login form with Tailwind CSS.
- Backend status message fetched with Axios.
- Login request sent with Axios using the values entered in the form.
- Loading, success, validation, invalid-credentials, and network-error messages.
- Backend logs the submitted username and whether a password was received, but never logs the password itself.
- No database, JWT, or browser storage.

## Project structure

```text
.
|-- .gitignore
|-- README.md
|-- backend/
|   |-- package.json
|   |-- package-lock.json
|   `-- server.js
`-- frontend/
    |-- index.html
    |-- package.json
    |-- package-lock.json
    |-- postcss.config.cjs
    |-- tailwind.config.cjs
    |-- vite.config.js
    `-- src/
        |-- App.css (legacy file; not imported by the app)
        |-- App.jsx
        |-- index.css
        `-- main.jsx
```

`node_modules/` and generated build output are created locally during installation and builds; Git ignores them. The `package-lock.json` files are important and should be committed so installs use consistent dependency versions.

## Requirements

- Node.js 18 or later
- npm

## Install and run

Open two terminals in the project folder.

### Terminal 1: Express backend

The backend entry file is `backend/server.js`.

```bash
cd backend
npm install
npm start
```

The API listens on `http://localhost:5000`.

### Terminal 2: React frontend

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`. Keep both terminals running. After changing backend code, restart its server so Node loads the changes.

## Demo login

```text
Username: admin
Password: 12345
```

These are fixed practice credentials only. The backend prints the submitted username and whether the password field was received for learning purposes. It does **not** print the password value.

## API endpoints

### `GET /`

Returns a simple JSON message confirming the backend server is running.

```json
{
  "message": "Backend Server is Working!",
  "status": "success"
}
```

### `GET /api/message`

Checks that the backend is reachable and returns a status message.

Example response:

```json
{
  "message": "Backend is working!",
  "status": "success"
}
```

### `POST /api/login`

Accepts JSON containing the username and password entered in the form:

```json
{
  "username": "admin",
  "password": "12345"
}
```

Successful login returns HTTP 200:

```json
{
  "success": true,
  "message": "Login successful!",
  "user": {
    "username": "admin"
  }
}
```

Incorrect credentials return HTTP 401 with `success: false` and an error message. Missing or empty fields return HTTP 400 with a validation message.

## Request flow

1. The user types into the React inputs. `useState` keeps the current username and password.
2. Axios sends those values to `POST http://localhost:5000/api/login`.
3. Express uses `express.json()` to read the JSON values from `req.body`.
4. The backend logs the username and whether a password was provided (never the password itself), then checks the demo credentials.
5. Express returns a JSON response. React displays the response message and, after success, the username returned by the backend.

The page also calls `GET http://localhost:5000/api/message` to show the backend connection status. CORS is enabled so the Vite frontend can call the Express API.

## Files Git should ignore

The root `.gitignore` excludes `node_modules/`, private `.env` files, generated build output, coverage reports, logs, operating-system files, and common editor temporary files. It allows `.env.example` files to be included if you add one. Source code, configuration, `package.json`, and `package-lock.json` are not ignored.

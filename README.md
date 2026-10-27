# LinkNest UI

The React frontend for LinkNest, a link management application where users can manage their links and profiles and share public-facing link pages.

## Features

- Registration and login screens.
- User dashboard for adding, editing, and deleting links.
- Profile/bio editing.
- Public profile pages at `/:username`.
- Protected dashboard and administrator pages in the React router.
- Basic click tracking through the backend API.
- Administrator dashboard with statistics, user data, and a growth chart.

## Technology

- React 19
- Vite
- JavaScript / JSX
- React Router DOM
- Axios
- `jwt-decode`
- Recharts
- Custom CSS

## How it works

```text
React page or component
        ↓
Axios API client
        ↓ HTTP / REST
LinkNest Spring Boot API
        ↓
JSON response
        ↓
React updates the interface
```

The Axios client checks `localStorage` for `jwtToken` and, when present, adds it to the `Authorization: Bearer ...` header. The frontend route guards improve navigation, but backend authorization is still required to protect data and operations.

## Requirements

- Node.js and npm
- LinkNest API running, or a deployed backend URL configured for the frontend

## Setup and run

1. Clone this repository and open its directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Check `src/services/api.js`. The reviewed code uses `http://localhost:8080` as its API base URL. Change it to the backend URL appropriate for your environment before running or deploying.
4. Start the development server:

   ```bash
   npm run dev
   ```

Vite prints the local URL in the terminal.

## Main routes

| Route | Purpose |
|---|---|
| `/` | Home page |
| `/login` | Login |
| `/register` | Registration |
| `/dashboard` | Signed-in user's dashboard |
| `/admin` | Administrator dashboard |
| `/:username` | Public profile route |

The public-profile route is a frontend route; whether each API call it makes is accessible without login depends on the backend's security configuration.

## Authentication flow

1. The user submits credentials to the backend login endpoint.
2. The frontend stores the returned JWT in `localStorage`.
3. The Axios request interceptor attaches the token when one is present.
4. The backend independently validates tokens and enforces endpoint authorization.

## Notes

- The frontend's protected-route component checks token presence in the browser; that check alone does not prove the token is valid.
- The administrator route decodes the token for UI behaviour, but administrative permissions must be enforced by the backend.
- Keep API URLs environment-specific for local and deployed use. Avoid committing credentials or secrets to the frontend.

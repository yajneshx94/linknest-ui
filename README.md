<div align="center">

  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&amp;size=30&amp;duration=2800&amp;pause=900&amp;color=C084FC&amp;center=true&amp;vCenter=true&amp;width=980&amp;lines=LinkNest+%7C+React+Frontend%3BReact+%2B+Vite%3BPublic+Profiles+%7C+Link+Dashboard" alt="Animated title: LinkNest UI" />

  <p><strong>The React frontend for managing personal links and sharing public-facing profile pages.</strong></p>

  <p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&amp;logoColor=black&amp;style=for-the-badge" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&amp;logoColor=white&amp;style=for-the-badge" alt="Vite" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&amp;logoColor=black&amp;style=for-the-badge" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Axios-API+Client-5A29E4?logo=axios&amp;logoColor=white&amp;style=for-the-badge" alt="Axios" />
  <img src="https://img.shields.io/badge/React+Router-DOM-CA4245?logo=reactrouter&amp;logoColor=white&amp;style=for-the-badge" alt="React Router" />
  <img src="https://img.shields.io/badge/Recharts-Data+Charts-22B5BF?style=for-the-badge" alt="Recharts" />
  </p>

  <p>
  <a href="https://github.com/yajneshx94/linknest-ui/stargazers"><img src="https://img.shields.io/github/stars/yajneshx94/linknest-ui?style=for-the-badge&amp;logo=github" alt="GitHub stars" /></a>
  <a href="https://github.com/yajneshx94/linknest-ui/network/members"><img src="https://img.shields.io/github/forks/yajneshx94/linknest-ui?style=for-the-badge&amp;logo=github" alt="GitHub forks" /></a>
  <a href="https://github.com/yajneshx94/linknest-ui/commits/main/"><img src="https://img.shields.io/github/last-commit/yajneshx94/linknest-ui?style=for-the-badge&amp;logo=git" alt="Last commit" /></a>
  </p>

  <a href="https://github.com/yajneshx94/linknest-ui"><strong>View source repository →</strong></a>

</div>

<p align="center"><img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" alt="Decorative rainbow divider" /></p>

---

The React frontend for LinkNest, a link management application where users can manage their links and profiles and share public-facing link pages.

**Related repository:** [LinkNest API](https://github.com/yajneshx94/linknest-api)

## 🧭 Contents

- [Features](#features)
- [Technology](#technology)
- [How it works](#how-it-works)
- [Requirements](#requirements)
- [Setup and run](#setup-and-run)
- [Main routes](#main-routes)
- [Authentication flow](#authentication-flow)
- [Notes](#notes)

<a id="features"></a>
## Features
- Registration and login screens.
- User dashboard for adding, editing, and deleting links.
- Profile/bio editing.
- Public profile pages at `/:username`.
- Protected dashboard and administrator pages in the React router.
- Basic click tracking through the backend API.
- Administrator dashboard with statistics, user data, and a growth chart.

<a id="technology"></a>
## Technology
- React 19
- Vite
- JavaScript / JSX
- React Router DOM
- Axios
- `jwt-decode`
- Recharts
- Custom CSS

<a id="how-it-works"></a>
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

<a id="requirements"></a>
## Requirements
- Node.js and npm
- LinkNest API running, or a deployed backend URL configured for the frontend

<a id="setup-and-run"></a>
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

<a id="main-routes"></a>
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

<a id="authentication-flow"></a>
## Authentication flow
1. The user submits credentials to the backend login endpoint.
2. The frontend stores the returned JWT in `localStorage`.
3. The Axios request interceptor attaches the token when one is present.
4. The backend independently validates tokens and enforces endpoint authorization.

<a id="notes"></a>
## Notes
- The frontend's protected-route component checks token presence in the browser; that check alone does not prove the token is valid.
- The administrator route decodes the token for UI behaviour, but administrative permissions must be enforced by the backend.
- Keep API URLs environment-specific for local and deployed use. Avoid committing credentials or secrets to the frontend.

---

<div align="center">

  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" alt="Decorative rainbow divider" />

  <p><strong>Thanks for checking out this project!</strong></p>

  <p>
    <img src="https://visitor-badge.laobi.icu/badge?page_id=yajneshx94.linknest-ui&amp;left_color=24292e&amp;right_color=C084FC&amp;left_text=Repository%20visitors" alt="Repository visitor count" />
  </p>

</div>

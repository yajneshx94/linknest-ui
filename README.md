# LinkNest UI - A Multi-Tenant Link-in-Bio Frontend

![React](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-fast-yellow) ![MUI](https://img.shields.io/badge/MUI-v5-blue) ![Axios](https://img.shields.io/badge/Axios-API%20Calls-purple)

This repository contains the frontend user interface for **LinkNest**, a full-stack, multi-tenant "link-in-bio" application. This React single-page application (SPA) consumes the Java Spring Boot backend API to provide a seamless user experience.

The application features a complete authentication flow, a private dashboard for managing links, and dynamic, public-facing profile pages for sharing.

**Live Frontend Demo:** [Link to your deployed Vercel URL will go here]
**Backend Repository:** [Link to your `linknest-api` GitHub repository]

---

## Key Features & Architectural Concepts

This frontend demonstrates several key concepts for building modern web applications:

* **JWT Authentication Flow:** The application manages the full user authentication lifecycle. It provides forms for registration and login, and upon successful login, it securely stores the received **JSON Web Token (JWT)** in the browser's `localStorage`. An `axios` interceptor is used to automatically attach this token to the `Authorization` header of all subsequent requests to protected backend endpoints.

* **Protected Routes:** The application uses `react-router-dom` to implement client-side protected routing. A custom `ProtectedRoute` component acts as a gatekeeper, checking for the presence of a JWT in `localStorage`. If the token is missing, the user is automatically redirected to the login page, preventing unauthorized access to private areas like the dashboard.

* **Dynamic Public Profiles:** The application utilizes dynamic routing (`/:username`) to generate unique, public-facing profile pages for each user. The `useParams` hook from `react-router-dom` is used to extract the username from the URL, fetch the corresponding public data from the API, and render the user's list of links.

* **Professional & Responsive UI:** The entire user interface is built using **MUI (Material-UI)**, a comprehensive library of pre-built React components. This ensures a clean, modern, and responsive design that works well on both desktop and mobile devices.

---

## Tech Stack

* **Framework:** React 18
* **Build Tool:** Vite
* **Routing:** React Router DOM
* **API Communication:** Axios
* **UI Components:** MUI (Material-UI)
* **Language:** JavaScript (JSX)

---

## Application Structure

The application is structured into several key areas:

* **`pages`:** Contains the main page components of the application (e.g., `Login`, `Register`, `Dashboard`, `PublicProfile`).
* **`components`:** Contains reusable components, such as the `ProtectedRoute`.
* **`services`:** Contains helpers and services, like the `api.js` Axios instance with its JWT interceptor.

---

## Setup and Run Locally

To run this project on your local machine, follow these steps:

1.  **Prerequisites:**
    * Node.js and npm
    * The [LinkNest Backend API](https://github.com/yajneshx94/linknest-api) must be running locally on `http://localhost:8080`.

2.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/linknest-ui.git](https://github.com/your-username/linknest-ui.git)
    cd linknest-ui
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

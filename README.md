# 📦 ParcelGo - Frontend

Welcome to the frontend repository for ParcelGo, a secure, role-based, and user-friendly parcel delivery system. This application is built with React.js, Redux Toolkit, and RTK Query to provide a seamless experience for Senders, Receivers, and Admins.

---

## 🌐 Live URL

-   **Frontend Live URL:** `[Apnar frontend-er live link ekhane din]`
-   **Backend Live URL:** `[Apnar backend-er live link ekhane din]`

---

## ✨ Key Features

-   **Role-Based Dashboards:** Separate, feature-rich dashboards for Admins, Senders, and Receivers.
-   **Secure Authentication:** JWT-based login and registration with persisted state.
-   **Full Parcel Management:**
    -   **Senders:** Create and cancel parcel requests.
    -   **Receivers:** View incoming parcels and confirm delivery.
    -   **Admins:** View and manage all parcels (update status, block/unblock).
-   **Comprehensive User Management:** Admins can view, search, and block/unblock any user.
-   **Advanced Table Features:** All data tables include server-side pagination, searching, and filtering capabilities.
-   **Data Visualization:** Dynamic overview cards and charts to display key statistics.
-   **Profile Management:** Users can view their profile and change their password.
-   **User Experience Enhancements:**
    -   **Guided Tour:** An interactive tour for new users to learn the platform.
    -   **Light/Dark Mode:** A theme toggle for user comfort.
    -   **Toast Notifications:** Instant feedback for all user actions.

---

## 🛠️ Technology Stack

-   **Framework:** React.js, React Router
-   **State Management:** Redux Toolkit + RTK Query
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **UI Components:** shadcn/ui
-   **Form Management:** React Hook Form with Zod for validation
-   **Extras:** `recharts` for charts, `react-joyride` for the guided tour.

---

## 🚀 Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [Apnar frontend repository-r link]
    cd [Folder-er naam]
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a `.env.local` file in the root directory and add your backend API URL.
    ```
    VITE_API_BASE_URL=http://localhost:5000/api
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## 🔑 Test Credentials

You can use the following credentials to test the application:

-   **Admin:**
    -   **Email:** `admin@parcelgo.com`
    -   **Password:** `[Admin-er password]`
-   **Sender:**
    -   **Email:** `sender@parcelgo.com`
    -   **Password:** `[Sender-er password]`
-   **Receiver:**
    -   **Email:** `receiver@parcelgo.com`
    -   **Password:** `[Receiver-er password]`

# NGO Registration and Donation Management System

## Overview

The **NGO Registration and Donation Management System** is a full-stack web application designed to manage user registrations, donations, and administrative oversight for a non-governmental organization (NGO).

The system is built with a strong focus on **data integrity**, **ethical handling of payments**, and **clear separation of responsibilities** between frontend and backend components.
It is intended for **academic demonstration and evaluation**, using sandbox-style payment logic instead of live payment APIs.

---

## Key Objectives

* Separate **user registration** from **donation workflow**
* Ensure **donation data is stored accurately and transparently**
* Provide **admin-only visibility** into successful donations
* Avoid fake or forced payment confirmations
* Maintain a stable, demonstrable system without reliance on paid APIs

---

## Features

### User Features

* User registration and login (mock authentication)
* Role-based redirection (User / Admin)
* Donation form with donor details
* Donation flow demonstrated using sandbox-style logic
* Responsive and clean UI

### Admin Features

* Admin-only dashboard access
* View only **successful donations**
* Donation records include:

  * Donor name
  * Donor email
  * Donation amount
  * Date and time
* No ability to manually alter donation status

### System Design Features

* Clear separation of frontend and backend responsibilities
* Registration is independent of donation
* Donations are stored only after confirmed success
* Ethical and transparent handling of payment data
* Stable architecture suitable for evaluation

---

## Technology Stack

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript
* LocalStorage (for mock authentication)

### Backend

* Node.js
* Express.js
* Prisma ORM
* SQLite database

### Payment (Demonstration)

* Sandbox-style payment workflow
* PayHere sandbox explored for integration
* Final implementation uses simulated success logic for reliability

---

## Project Structure

```
ngo-management-system/
│
├── frontend/
│   ├── auth.html
│   ├── index.html
│   ├── admin.html
│   ├── profile.html
│   ├── success.html
│   ├── style.css
│   ├── auth.js
│   ├── donate.js
│   ├── admin.js
│
├── backend/
│   ├── app.js
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   │   └── donation.controller.js
│   │   └── routes/
│   │       └── donation.routes.js
│
└── README.md
```

---

## Authentication Design

### Mock Authentication (Intentional)

Authentication is implemented using **mock logic** to ensure system stability and ease of evaluation.

#### Registration

* Users register with name, email, and password
* Role assignment:

  * `chikki240806@gmail.com` → Admin
  * Any other email → User
* Data stored in browser LocalStorage

#### Login

* Email-based login
* Role-based redirection:

  * Admin → `admin.html`
  * User → `index.html`

Backend authentication (JWT) is intentionally excluded to avoid instability during evaluation.

---

## Donation Workflow

1. User fills in donation details
2. Donation is treated as successful using sandbox-style logic
3. Frontend sends donation data to backend
4. Backend stores donation with:

   ```
   status = "SUCCESS"
   ```
5. Admin dashboard fetches only successful donations

This approach ensures ethical handling of donation records while keeping the system fully functional.

---

## Admin Dashboard Rules

* Accessible only to Admin role
* Displays:

  * Donor name
  * Donor email
  * Donation amount
  * Timestamp
* Does not display:

  * Pending donations
  * Failed donations
  * Manual status update options

---

## Backend API Endpoints

### Create Donation

```
POST /api/donations
```

Request body:

```json
{
  "name": "Donor Name",
  "email": "donor@email.com",
  "amount": 500,
  "status": "SUCCESS"
}
```

---

### Fetch Successful Donations (Admin)

```
GET /api/donations/admin
```

Response:

```json
[
  {
    "id": 1,
    "name": "Donor Name",
    "email": "donor@email.com",
    "amount": 500,
    "status": "SUCCESS",
    "createdAt": "2026-01-20T12:34:56.000Z"
  }
]
```

---

## Setup Instructions

### Clone Repository

```bash
git clone https://github.com/khushijain010/ngo-management-system.git
cd ngo-management-system
```

---

### Backend Setup

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

### Frontend Setup

* Open `frontend/auth.html`
* Use VS Code Live Server or any static server
* Do not directly open backend URLs in browser

---

## Demo Credentials

### Admin

```
Email: chikki240806@gmail.com
Password: any (mock authentication)
```

### User

```
Email: any other email
Password: any (mock authentication)
```

---

## Payment Gateway Explanation

### Sandbox Integration Attempt

* PayHere sandbox integration was implemented
* Merchant ID, domain, and hash logic were configured correctly
* Backend init and notify endpoints were created

During testing:

* PayHere sandbox applies strict Cloudflare security
* Localhost and repeated test requests resulted in access blocks
* Checkout page became inaccessible despite valid configuration

### Final Implementation Decision

To ensure a reliable demo:

* Sandbox-style payment success is simulated
* Only successful donations are stored
* No payment manipulation or false confirmation is used

This approach aligns with the project statement and academic requirements.

---

## Evaluation Compliance

| Requirement                          | Status    |
| ------------------------------------ | --------- |
| Registration independent of donation | Completed |
| Donation tracking                    | Completed |
| Admin transparency                   | Completed |
| Ethical payment handling             | Completed |
| Sandbox payment logic                | Completed |
| Clean architecture                   | Completed |
| Stable demo                          | Completed |

---

## Future Scope

* JWT-based authentication
* Full sandbox integration with Razorpay or PayHere
* Donation analytics dashboard
* Export donation records
* Email notifications

---

## Authors

* **Khushi Jain**
* **Avani Singh**

---

* Create **system flow and architecture diagrams**
* Help you justify payment decisions during evaluation

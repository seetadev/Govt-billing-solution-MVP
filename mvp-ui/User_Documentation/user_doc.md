# Government Billing & Invoicing System – **User Documentation**

> **Version 0.1 | Last updated 03 June 2025**

---

## 1 Overview

The **Government Billing & Invoicing System (GBIS)** is a cross‑platform solution that lets government departments & public‑sector entities generate, track and archive invoices digitally.
The system is composed of two main modules:

| Module                                          | Tech Stack                                            | Repository                                                                                                                                                 |
| ----------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend – Govt‑Billing‑React**               | React 18 (+ Vite), React‑Router, Tailwind CSS         | [https://github.com/ManasMadan/C4GT-GovtInvoice/tree/main/Govt-Billing-React](https://github.com/ManasMadan/C4GT-GovtInvoice/tree/main/Govt-Billing-React) |
| **Backend – c4gt‑website (Flask + SocialCalc)** | Python 3.10, Flask 2.x, SocialCalc spreadsheet engine | [https://github.com/ManasMadan/c4gt-website](https://github.com/ManasMadan/c4gt-website)                                                                   |

Together they provide a secure workflow covering authentication, invoice creation, PDF export, spreadsheet‑based analytics and REST APIs for third‑party integrations.

---

## 2 Audience & Scope

This document is aimed at **end‑users** (clerks, auditors, finance officers) who need to **install, configure and use** the application—either on‑prem (desktop browser) or as a PWA/mobile build.
For developer‑centric details (code structure, contribution workflow, CI), refer to **`dev_doc.md`**.

---

## 3 Prerequisites

| Component                   | Minimum Version | Notes                                |
| --------------------------- | --------------- | ------------------------------------ |
| **Node.js**                 | 18 LTS          | Needed for the React client          |
| **npm / pnpm / yarn**       | npm 9 +         | Use one package manager consistently |
| **Python**                  | 3.9 +           | Confirm `python --version`           |
| **pip**                     | 22 +            | Ships with Python ≥3.9               |
| **Git**                     | 2.30 +          | To clone repositories                |
| **Google/Firebase project** | Any tier        | Only if you want Google OAuth        |

> **Tip – Windows users**: enable WSL 2 or use Git Bash/PowerShell for Unix‑like commands.

---

## 4 Quick Start (Local Dev)

### 4.1 Clone the repositories

```bash
# Frontend
git clone https://github.com/ManasMadan/C4GT-GovtInvoice.git
# Backend
git clone https://github.com/ManasMadan/c4gt-website.git
```

### 4.2 Environment variables

Create `.env` files by copying the examples:

```bash
# Frontend
gcp cp C4GT-GovtInvoice/Govt-Billing-React/.env.example C4GT-GovtInvoice/Govt-Billing-React/.env
# Backend
cp c4gt-website/.env.example c4gt-website/.env
```

Fill in the placeholders:

* **`VITE_API_BASE_URL`** – e.g. `http://localhost:5000`
* **`VITE_FIREBASE_API_KEY / AUTH_DOMAIN / PROJECT_ID`** – from Firebase Console
* **Flask secrets** in backend `.env`: `SECRET_KEY`, `DB_URL`, `SOCIALCALC_URL`, etc.

### 4.3 Start backend (Flask + SocialCalc)

```bash
cd c4gt-website
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
export FLASK_APP=app.py  # or 'wsgi.py' if provided
flask run  # default on http://localhost:5000
```

### 4.4 Start frontend (React)

```bash
cd ../C4GT-GovtInvoice/Govt-Billing-React
npm install        # or pnpm i / yarn
npm run dev        # vite dev server on http://localhost:5173
```

When both modules are running, open the frontend URL in your browser.
Login redirects to Google OAuth; if you see **“Unauthorized domain”** follow § 6.3.

---

## 5 Feature Walk‑through

1. **Login / Sign‑up** — Google OAuth or email‑password (Firebase Auth).
2. **Dashboard** — quick stats: unpaid invoices, monthly totals, CSV export.
3. **Create Invoice**

   * Select customer (auto‑complete) / add new.
   * Add line items (qty, rate, tax %).  Live totals update.
   * Save draft, preview PDF, send via email.
4. **Search & Filters** — status, date range, department, amount.
5. **Spreadsheet Reports** — backend pipes data to SocialCalc for pivot/graphs.
6. **Settings** — organisation profile, GST/Tax presets, currency, access roles.

---

## 6 Configuration Details

### 6.1 Backend (`.env`)

```
SECRET_KEY=change-me
DATABASE_URL=sqlite:///gbis.db       # dev; switch to Postgres in prod
SOCIALCALC_URL=https://<host>/sc
MAIL_SERVER=smtp.gmail.com
MAIL_USERNAME=...  # app‑password recommended
```

### 6.2 Frontend (`.env`)

```
VITE_API_BASE_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
```

### 6.3 Adding Authorized Domains (Firebase Auth)

1. Open **Firebase Console → Authentication → Settings**.
2. Under *Authorized domains* click **Add domain**.
3. Enter `localhost` (for dev) *and* your deployment host (`govtbill.example.gov`).
4. Save → refresh the React app → login succeeds.

---

## 7 Deployment

### 7.1 Backend

| Target              | Notes                                                       |
| ------------------- | ----------------------------------------------------------- |
| **Docker**          | `docker-compose up --build` (compose file in repo)          |
| **Heroku / Render** | Set config vars from `.env`. Add buildpack `heroku/python`. |

### 7.2 Frontend

| Target                        | Steps                                                                 |
| ----------------------------- | --------------------------------------------------------------------- |
| **Vercel / Netlify**          | `npm run build` – output in `dist/`. Point `API_BASE_URL` to backend. |
| **Static on S3 + CloudFront** | Upload `dist/`, enable SPA fallback.                                  |

> **Remember :** update *CORS* in Flask (`flask‑cors`):

```python
from flask_cors import CORS
CORS(app, resources={r"/api/*": {"origins": ["https://your‑frontend‑url"]}})
```

---

## 8 API Reference (selected)

| Method | Endpoint                 | Description                           |
| ------ | ------------------------ | ------------------------------------- |
| `POST` | `/api/auth/login`        | OIDC token exchange                   |
| `GET`  | `/api/invoices`          | List (query params: `status`, `page`) |
| `POST` | `/api/invoices`          | Create new invoice (JSON body)        |
| `GET`  | `/api/invoices/<id>/pdf` | Fetch rendered PDF                    |
| `GET`  | `/api/reports/summary`   | High‑level stats for dashboard        |

Full OpenAPI spec is bundled in the backend repo as `openapi.yaml`.

---

## 9 Troubleshooting & FAQs

| Symptom                                 | Possible Cause                                    | Fix                                               |
| --------------------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| **Login shows “domain not authorised”** | Firebase Auth domain missing                      | See § 6.3                                         |
| **Blank page after build**              | Wrong `VITE_API_BASE_URL` or 404 SPA route        | Double‑check env & add `/*` fallback rule on host |
| **CORS error (403)**                    | Backend not sending `Access‑Control‑Allow‑Origin` | Install/configure `flask‑cors`                    |
| **PDF download fails (500)**            | SocialCalc not reachable                          | Verify `SOCIALCALC_URL`, network security group   |

---

## 10 Road‑map / Known Issues

* [ ] Offline‑first caching (Service Worker)
* [ ] Multi‑tenant support per department
* [ ] Role‑based access (Admin / Maker / Checker)
* [ ] i18n → Hindi & regional languages

---

## 11 Support & Contact

* **Issue Tracker**: open an issue in the respective repo with the *user* label.
* **Email**: govtbill‑[support@example.gov](mailto:support@example.gov)
* **Slack**: #c4gt‑govtbilling (invite‑only).

---

## 12 License

GBIS is released under the **MIT License**.  See `LICENSE` file.

---

© 2025 Digital Public Goods Initiative.  All rights reserved.

# Govt Billing React – Developer Guide

*Last updated: 03 Jun 2025*

---

## 1 Stack at a Glance

* **React 18 + Vite** – fast dev server & builds
* **Tailwind CSS** – utility‑first styling
* **Redux Toolkit** – state slices (auth, invoices)
* **Firebase Auth** – Google / email login
* Talks to a **Flask API** (separate repo)

---

## 2 Local Setup

```bash
# clone and install
git clone https://github.com/<you>/Govt-Billing-React.git
cd Govt-Billing-React
npm install

# env vars
cp .env.example .env.local  # add API url + Firebase keys

# run
auth_PORT=5173 npm run dev  # http://localhost:5173
```

The Vite dev server proxies `/api/*` to your Flask URL.

---

## 3 Project Layout (short)

```
src/
  components/   # buttons, inputs
  pages/        # route views
  features/     # Redux slices
  api/          # RTK Query endpoints
```

---

## 4 Useful Scripts

| Command         | What it does             |
| --------------- | ------------------------ |
| `npm run dev`   | Hot‑reload dev server    |
| `npm run lint`  | ESLint + Prettier check  |
| `npm test`      | Jest unit tests          |
| `npm run build` | Production build (dist/) |

---

## 5 Commit & PR Flow

1. **Branch**: `feat/<scope>` or `fix/<scope>`.
2. Run `npm run lint && npm test` – keep green.
3. Commit with clear message: `feat(invoice): allow PDF email`.
4. Open PR → get review → squash‑merge.

---

## 6 Deploy in 30 sec

```bash
npm run build       # creates dist/
# Vercel example
vercel --prod       # follows .env.production
```

Netlify or S3 works the same—just host the *dist* folder.

---

## 7 Need a hand?

Ping **#govtbilling-dev** on Slack or open a GitHub issue with the label *help‑wanted*.

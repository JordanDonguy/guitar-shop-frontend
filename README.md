# 🎸 Guitar Shop Frontend

A responsive, modern frontend for an online guitar store. This application is built with **React**, **Vite**, and **Tailwind CSS**, and connects to a backend API for product data, authentication, cart management, and checkout.

> ⚠️ This app is meant to be used via its live deployment.  
> Running it locally requires a **local backend instance** (see Backend Repository).  
> Without the backend, local development is limited due to API restrictions (e.g., CORS policies, origin whitelists).

---

## 🚀 Live Demo

👉 [https://app.guitar-shop.store](https://app.guitar-shop.store)

---

## 🗄️ Backend Repo

👉 [https://github.com/JordanDonguy/guitar-shop-backend](https://github.com/JordanDonguy/guitar-shop-backend)

---

## ✨ Features

- 🛒 Browse a wide range of guitar products with descriptions and media
- 🔍 View detailed product information and stock status
- 🛍️ Add products to your cart and update quantities
- ✅ Complete a checkout process with shipping and contact info
- 🔐 Authentication support with persistent login via cookies
- 🔓 Google Oauth2.0 authentication method
- 📪 Password reset via email
- ✉️ Newsletter subscription
- 📱 Mobile-friendly and responsive design
- 📝 Markdown rendering for product descriptions
- ▶️ Embedded YouTube video support for products (if available)

---

## 🛠️ Tech Stack

- **React** – Component-based UI library
- **Vite** – Fast frontend tooling and dev server
- **Tailwind CSS** – Utility-first CSS framework
- **React Router** – Declarative routing
- **React Markdown** – Render Markdown in React
- **React Toastify** – Toast pop-up informations
- **Prettier** – Code formatter for consistent styling
- **ESLint** – Linting tool to catch bugs and enforce code quality
- **Cloudflare Pages** – Hosting platform
- **Cloudflare** – DNS management, CDN caching, SSL, and security

---

## 📁 Project Structure

<pre lang="md">text guitar-shop-frontend/ 
├── public/
├── src/
│ ├── contexts/
│ ├── components/
| ├── utils/
│ ├── pages/
│ ├── App.jsx
| ├── main.jsx 
│ └── styles.css
├── .gitignore 
├── .pettierrc
├── eslint.config.js
├── favicon-new.ico
├── index.html
├── package.json
├── posscss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md </pre>

---

## 💻 Local Development

To run the project locally, you’ll need to have **Node.js (>=18)** and **npm** installed.

1. **Clone the repository**

   ```bash
   git clone https://github.com/JordanDonguy/guitar-shop-frontend.git
   cd guitar-shop-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure API base URL**  
   Open [`/src/utils/api.js`](./src/utils/api.js) and replace the value of `BASE_URL` with your local backend address:

   ```js
   // src/utils/api.js
   export const BASE_URL = "http://localhost:3000";
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Visit the app**  
   Open [http://localhost:5173](http://localhost:5173) in your browser.

> ⚠️ Make sure your backend API is running locally on port `3000` for the app to function correctly.

---

## 📦 Deployment

This app is deployed using **Cloudflare Pages**. Additionally, it is protected and accelerated by **Cloudflare**, which provides DNS management, CDN caching, SSL encryption, and security features like DDoS protection and a web application firewall.

You can fork the repository and link it to your own Cloudflare account for redeployment if needed.

---

## 📄 License

This project is for educational and portfolio purposes only.  
Not licensed for reuse or redistribution.

---

## 👤 Author

Developed by [Jordan Donguy](https://github.com/JordanDonguy)

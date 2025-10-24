// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";

// createRoot(document.getElementById("root")!).render(<App />);
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // Impor BrowserRouter

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* ▼▼▼ TAMBAHKAN 'basename' DI SINI ▼▼▼ */}
    <BrowserRouter basename="/punagaan/">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";

// createRoot(document.getElementById("root")!).render(<App />);
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// ▼▼▼ UBAH IMPOR INI ▼▼▼
import { HashRouter } from 'react-router-dom'

// Hapus 'basename'
// const basename = import.meta.env.DEV ? '/' : '/punagaan/';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* ▼▼▼ UBAH TAG INI (dan hapus prop 'basename') ▼▼▼ */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
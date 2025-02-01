import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import App from './App'
import CryptoDetails from './components/CryptoDetails'

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/coin/:id" element={<CryptoDetails />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
  )
} else {
  console.error('Failed to find the app container element')
}

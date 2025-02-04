import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router'

import App from './App'
import CryptoDetails from './components/CryptoDetails'
import Header from './components/Header'
import { store } from './store/store'

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/coin/:id" element={<CryptoDetails />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
  )
} else {
  console.error('Failed to find the app container element')
}

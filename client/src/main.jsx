import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { ClerkProvider } from '@clerk/react'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  <ClerkProvider appearance={{
    variables: {
      colorPrimary: "#4f46e5",
      colorBackground: "white",
      colorText: "#4f46e5",
      colorInputBackground: "#1f2937",
      colorInputText: "#ffffff",
    }
  }} publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>,
)

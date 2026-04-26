import React from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import './styles/globals.css';

// Apply persisted dark mode before first render to prevent flash
const stored = localStorage.getItem('lrn-guide-storage');
if (stored) {
  try {
    const { state } = JSON.parse(stored);
    if (state?.isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  } catch {
    // Ignore parse errors
  }
}

const root = document.getElementById('root');
if (!root) throw new Error('#root element not found');

createRoot(root).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <Toaster position="top-right" richColors closeButton />
    </AuthProvider>
  </React.StrictMode>
);

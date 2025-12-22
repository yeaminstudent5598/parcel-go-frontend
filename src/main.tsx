import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Toaster } from './components/ui/sonner'
import { loadUserFromStorage } from './features/auth/authSlice'
import { ThemeProvider } from './components/theme-provider'
import { HelmetProvider } from 'react-helmet-async' 

store.dispatch(loadUserFromStorage());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider> 
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
          <Toaster richColors position="top-right" />
        </Provider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
)
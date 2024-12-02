import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LocationsProvider } from './context/locations.context'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LocationsProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <App />
      </LocationsProvider>
    </QueryClientProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GeoAutocomplete from './GeoAutocomplete.tsx'
import './index.css'

const GMAP_API_KEY = import.meta.env.VITE_GMAP_API_KEY;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GeoAutocomplete API_KEY={GMAP_API_KEY}  />
  </StrictMode>,
)

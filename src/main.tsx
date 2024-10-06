import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GeoAutocompleteForm from './GeoAutocompleteForm.tsx'

const GMAP_API_KEY = import.meta.env.VITE_GMAP_API_KEY;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GeoAutocompleteForm API_KEY={GMAP_API_KEY} onFinish={(value => {
      console.log(value)
    })}/>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { LanguageContextProvider } from './context/languageContext.jsx'
import {ArtworkProvider} from './context/artworkContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ArtworkProvider>
    <LanguageContextProvider>
    <HashRouter>
      <App />
    </HashRouter>
    </LanguageContextProvider>
    </ArtworkProvider>
  </StrictMode>

)

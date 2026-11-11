import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { Provider as JotaiProvider } from 'jotai'
import { store } from './store/store'
import Home from './components/Home'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <JotaiProvider>
        <Home />
      </JotaiProvider>
    </ReduxProvider>
  </StrictMode>
)
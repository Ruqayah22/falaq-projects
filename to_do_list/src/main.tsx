import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import {App} from './app/index'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <h1>hello world</h1>
    {/* <App /> */}
  </StrictMode>,
)

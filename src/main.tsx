import { StrictMode } from 'react'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import { createRoot } from 'react-dom/client'

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/home",
        element:<Home/>,
      },
      {
        path:"/about",
        element:<About/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
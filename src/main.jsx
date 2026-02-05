import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import 'bootstrap'
import './assets/all.scss'
import { createHashRouter, RouterProvider } from 'react-router'
import routes from './routes/index.jsx'

const router = createHashRouter(routes);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)

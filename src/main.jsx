import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import 'bootstrap'
import './assets/all.scss'
import { createHashRouter, RouterProvider } from 'react-router'
import routes from './routes/index.jsx';
import store from './store/store.js';
import { Provider } from 'react-redux';
import MessageToast from './components/MessageToast.jsx';

const router = createHashRouter(routes);

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <MessageToast />
        <RouterProvider router={router}/>
    </ Provider>
)

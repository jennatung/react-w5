import Layout from "../Layout";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Admin from "../pages/Admin";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/orderSuccess";

const routes = [
    {
        path:'/',
        element: <Layout />,
        children:[
            {
                path: '/',
                element: <Home />
            },
            {
                path:'/productList',
                element: <ProductList />
            },
            {
                path:'/productDetails/:id',
                element: <ProductDetails />
            },
            {
                path:'/cart',
                element: <Cart />,
            },
            {
                path: '/cart/checkout',
                element: <Checkout />
            },        
            {
                path: '/cart/checkout/order-success',
                element: <OrderSuccess />
            },        
            {
                path:'/admin',
                element: <Admin />
            },
        ]
    },
]

export default routes;
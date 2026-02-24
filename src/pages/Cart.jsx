import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';
const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});


const Cart = () => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    const delProduct = async(id) => {
        try {
            const del = await axios.delete(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart/${id}`);
            getCart();
            Toast.fire({
                icon: "success",
                title: "品項刪除成功"
            });
        } catch (error) {
            alert(error.response.data);
        }
    }  
    
    const getCart = async() => {
        try {
            const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);      
            setCart(res.data.data.carts);
            setTotalPrice((res.data.data.carts).reduce((sum, item) => sum + item.product.price * item.qty, 0));
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(()=>{
        getCart();
    },[])


    return(<div className="container py-5">
        <h2 className="fw-bold">購物車</h2>
        <table className="container py-3 mt-5">
            <thead className="rol border-bottom">
                <tr>                    
                    <th className="col-1 pb-3 fw-bold">產品照片</th>
                    <th className="col-2 pb-3 fw-bold">產品名稱</th>
                    <th className="col-2 pb-3 fw-bold">售價</th>
                    <th className="col-2 pb-3 fw-bold">下單數量</th>
                    <th className="col-2 pb-3 fw-bold">預購/現貨</th>
                    <th className="col-2 pb-3 fw-bold">小計</th>
                    <th className="col-1">刪除</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((item)=>{
                    return <tr key={item.product.id}>
                        <td  className="pt-3"><img src={item.product.imageUrl} alt="" width={200} className="rounded-1"/></td>
                        <td  className="pt-3 fw-bold fs-5">{item.product.title}</td>
                        <td  className="pt-3 fs-5">{item.product.price}</td>
                        <td  className="pt-3 fs-5">{item.qty}</td>
                        <td  className="pt-3 fs-5">{item.product.num >= item.qty ? (<span className="fs-6">✔</span>) : (<span className="color-main fw-bold fs-6">預購數量 {item.qty - item.product.num}</span>)}</td>
                        <td  className="pt-3 fs-5">{(item.product.price)*(item.qty)}</td>
                        <td>
                            <button type="button" className="btn btn-sm btn-outline-secondary fs-6" onClick={()=>delProduct(item.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                </svg>
                            </button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
        <hr className="border-secondary"/>
        <div className="d-flex flex-column align-items-end">
            <p className="pb-1 pt-2 fw-bold fs-5 text-end color-main">總金額 ${totalPrice}</p>
            <div className="d-flex gap-2">
                <button className="btn btn-outline-success" onClick={() => navigate(-1)}>
                    繼續購物
                </button>
                <NavLink to="/cart/checkout" className="btn btn-success">前往結帳</NavLink>
            </div>
                
        </div>
        <hr className="pt-5 border-secondary"/>
        {/* {JSON.stringify(cart)} */}
    </div>)
}

export default Cart;
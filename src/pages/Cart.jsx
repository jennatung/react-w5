import axios from "axios";
import { useState, useEffect } from "react";
const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(()=>{
        (async()=>{
            const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);
            console.log(res.data.data.carts);
            setCart(res.data.data.carts);
            setTotalPrice((res.data.data.carts).reduce((sum, item) => sum + item.product.price * item.product.num, 0));
        })()
    },[])


    return(<div className="container py-5">
        <h2 className="fw-bold">購物車</h2>
        <table className="container py-3 mt-5">
            <thead className="rol border-bottom">
                <tr>
                    <th className="col-1 pb-3 fw-bold">產品照片</th>
                    <th className="col-1 pb-3 fw-bold">產品名稱</th>
                    <th className="col-1 pb-3 fw-bold">售價</th>
                    <th className="col-1 pb-3 fw-bold">數量</th>
                    <th className="col-2 pb-3 fw-bold">小計</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((item)=>{
                    return <tr key={item.product.id}>
                        <td  className="pt-3"><img src={item.product.imageUrl} alt="" width={200} className="rounded-1"/></td>
                        <td  className="pt-3 fw-bold">{item.product.title}</td>
                        <td  className="pt-3">{item.product.price}</td>
                        <td  className="pt-3">{item.product.num}</td>
                        <td  className="pt-3">{item.product.price}</td>
                    </tr>
                })}
            </tbody>
        </table>
        <hr className="border-secondary"/>
        <p className="pb-5 pt-2 fw-bold fs-5 text-end">總金額 ${totalPrice}</p>
        <hr className="py-5 border-secondary"/>
        {/* {JSON.stringify(cart)} */}
    </div>)
}

export default Cart;
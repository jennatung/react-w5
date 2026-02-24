import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router";


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
const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
        (async()=>{
            const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);
            // console.log(res.data.data.carts);
            setCart(res.data.data.carts);
            setTotalPrice((res.data.data.carts).reduce((sum, item) => sum + item.product.price * item.product.num, 0));
        })()
    },[])


    const { 
        register, 
        handleSubmit,
        formState:{errors}
    } = useForm({
        defaultValues: {
        customername: "",
        email: ""
        },mode: 'onChange',
    });

   const onSubmit = async(data) => {
        const orderData = {
            data: {
                user: {
                    name: data.customername,
                    email: data.email,
                    tel: data.phone,
                    address: data.address
                },
                message: data.message
            }
        }
        try {
            const res = await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/order`, orderData);
            navigate("/cart/checkout/order-success");
        } catch (error) {
            console.log(error);
            Toast.fire({
                icon: "error",
                title: error.response.data.message
            });
        } 
    };

    return (<>

        <div className="container py-5"> 
            <div className="row">
                <div className="col-3">
                    <div className="bg-body-secondary p-3 rounded-3">
                        <h2 className="text-start fs-4 fw-bold ">訂單明細</h2>
                        <hr className="pb-2"/>
                        {cart.map((item)=>{
                        return <div className="d-flex flex-column align-items-start justify-content-between mb-4" key={item.product.id}>
                            <h3 className="fs-6 fw-bold m-0">{item.product.title}</h3>
                            <div className="d-flex justify-content-between w-100 ps-1">
                                <p  className="fs-6 text-secondary m-0">x {item.qty}</p>
                                <p  className="fs-6 m-0">{(item.product.price)*(item.qty)}</p>
                            </div>
                        </div>
                        })}
                        <hr />
                        <div className="d-flex justify-content-between align-items-between">
                            <p className="fs-6 fw-bold">總計</p>
                            <p className="fs-6 fw-bold color-main">NT. {totalPrice}</p>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="p-3">
                        <h2 className="text-start fs-4 fw-bold pb-2">訂購資訊</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
                            {/* 姓名 */}
                            <div className="form-floating mb-3">
                                <input type="text" className={`form-control ${errors.customername && "border border-warning"}`} name="customername" placeholder="姓名" autoComplete="customername" 
                                {...register("customername",{
                                    required: "請輸入姓名"
                                })}
                                />
                                {errors.customername && (<div className="text-warning pt-1 text-start">{errors.customername.message}</div>)}
                                <label htmlFor="customername">姓名</label>
                            </div>
                            {/* Email */}
                            <div className="form-floating mb-3">
                                <input type="email" className={`form-control ${errors.email && "border border-warning"}`} name="email" placeholder="email" autoComplete="email" 
                                {...register("email",{
                                    required: "請輸入email",
                                    pattern:{
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "請輸入有效的電子郵件地址" 
                                    }
                                })}
                                />
                                {errors.email && (<div className="text-warning pt-1 text-start">{errors.email.message}</div>)}
                                <label htmlFor="email">Email</label>
                            </div>
                            {/* 手機 */}
                            <div className="form-floating mb-3">
                                <input type="tel" className={`form-control ${errors.phone && "border border-warning"}`} name="phone" placeholder="手機號碼" autoComplete="phone" 
                                {...register("phone",{
                                    required: "請輸入手機號碼",
                                    pattern: {
                                        value: /^09\d{2}-\d{6}$/, 
                                        message: "請依照手機格式 09XX-XXXXXX 輸入"
                                    }
                                })}
                                />
                                {errors.phone && (<div className="text-warning pt-1 text-start">{errors.phone.message}</div>)}
                                <label htmlFor="phone">手機號碼</label>
                            </div>
                            {/* 地址 */}
                            <div className="form-floating mb-3">
                                <input type="text" className={`form-control ${errors.address && "border border-warning"}`} name="address" placeholder="地址" autoComplete="street-address" 
                                {...register("address",{
                                    required: "請輸入地址"
                                })}
                                />
                                {errors.address && (<div className="text-warning pt-1 text-start">{errors.address.message}</div>)}
                                <label htmlFor="address">地址</label>
                            </div>
                            {/* 留言 */}
                            <div className="form-floating mb-3">
                                <textarea className={`form-control ${errors.message && "border border-warning"}`} name="message" placeholder="留言"   
                                {...register("message",{
                                    maxLength:{
                                        value: 100,
                                        message: "留言不得超過 100 字"
                                    }
                                })} style={{height: "100px"}} maxLength={101}
                                />
                                {errors.message && (<div className="text-warning pt-1 text-start">{errors.message.message}</div>)}
                                <label htmlFor="message">留言</label>
                            </div>
                            {/* 按鈕 */}
                            <div className="d-flex gap-2">
                                <NavLink to="/cart" className="btn btn-outline-success w-100">編輯購物車</NavLink>
                                <button type="submit" className="btn btn-outline-success w-100">送出訂單</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Checkout;
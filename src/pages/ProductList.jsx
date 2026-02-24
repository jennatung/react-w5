import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Pagination from "../components/Pagination";
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../slice/messageSlice";


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

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [pageInfo, setpageInfo] = useState({});
    const [cartQty, setCartQty] = useState([]);
    const [listLoadingState, setListLoadingState] = useState([]);
    const dispatch = useDispatch();

    const addCart = async(id, qty) => {
        const data = {
            product_id: id,
            qty: qty
        };  
        try {
            const res = await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`,{data});
            dispatch(createAsyncMessage(res.data));
            // Toast.fire({
            //     icon: "success",
            //     title: "加入購物車成功"
            // });
        } catch (error) {
            dispatch(createAsyncMessage(error.response.data));
            // Toast.fire({
            //     icon: "error",
            //     title: error.response.data.message
            // });
        } finally {
           setListLoadingState((prev)=>{
            return prev.filter((i) => i !== id);
           })
        }
    }


    //取得產品列表
    const getProducts = async (page = 1) => {
        try {
            const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/products?page=${page}`);      
            setProducts(res.data.products);
            setpageInfo(res.data.pagination);
            const initialCartQty = res.data.products.map(product => ({
                id: product.id,
                qty: product.num,  //下單數量
                num: 0  //庫存數量
            }));
            setCartQty(initialCartQty);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        getProducts();
    },[])

    return (<div className="container my-5 py-5">
        <h2 className="pb-5 fw-bold">產品列表</h2>
        <table className="container py-3">
            <thead>
                <tr>
                    <th>產品名稱</th>
                    <th>優惠價</th>
                    <th>產品照片</th>
                    <th>現貨數量</th>
                    <th>產品詳情</th>
                </tr>
            </thead>
            <tbody>                
                {products.map((product)=>{
                    return <tr key={product.id}>
                        <td className="fs-5 fw-bold">{product.title}</td>
                        <td className="fs-5">{product.price}</td>
                        <td className="fs-5"><img src={product.imageUrl} alt="" width={200}/></td>
                        <td className="fs-5">
                            <select 
                                className="form-select mb-3 w-100"
                                value={cartQty.find(item => item.id === product.id)?.num || ""}
                                onChange={(e) =>
                                    setCartQty(prev =>
                                    prev.map(item =>
                                        item.id === product.id
                                        ? { ...item, num: Number(e.target.value) }
                                        : item
                                    ))
                                }    
                            >
                                {Array.from({length:product.num},(_,i)=>(
                                    <option value={i + 1} key={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td className="fs-5">
                            <div className="btn-group" role="group" aria-label="Basic outlined example">
                                <Link to={`/productDetails/${product.id}`} className="text-decoration-none btn btn-outline-primary">點擊查看🔍</Link>
                                <button type="button" className="btn btn-outline-primary"
                                onClick={()=> {
                                        const selectedQty = cartQty.find(item => item.id === product.id)?.num || 1 ;
                                        addCart(product.id, selectedQty);
                                        setListLoadingState([...listLoadingState, product.id]);
                                    }} disabled={listLoadingState.includes(product.id)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart-plus" viewBox="0 0 16 16">
                                        <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
                                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                                    </svg>
                                    {listLoadingState.includes(product.id) && <span className="spinner-border spinner-border-sm"></span>}
                                                          
                                </button>
                            </div>
                        </td>
                    </tr>
                })}         
            </tbody>
        </table>
        <div className="pb-5 mb-5 d-flex justify-content-center">
            <Pagination pageInfo={pageInfo} getProducts={getProducts}/>
        </div>
        
    </div>);
}

export default ProductList;
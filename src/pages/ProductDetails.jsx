import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

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

const ProductDetails = () => {
    const params = useParams();
    const { id } = params;
    const [product, setProduct] = useState([]);
    const [cartQty, setCartQty] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        (async()=>{            
            const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/product/${id}`);
            setProduct(res.data.product);            
        })()
    },[])

    const addCart = async(id) => {
        setLoading(true);
        const qty = Number(cartQty);
        if (!qty || qty <= 0) return;
        const data = {
            product_id: id,
            qty: qty
        }
        try {
            const res = await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`,{data});
            navigate("/order-success");
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: error.response.data.message
            });
        } finally {
            setLoading(false);
        }
    }

    return(<>
        <h2 className="pt-3">產品詳情頁</h2>
        <hr />
        <div className="container d-flex gap-5 my-5">
            <div className="col-6">
                <img src={product.imageUrl} alt=""
                className="rounded-3 img-fluid"/>
            </div>
            <div className="text-start col-4">
                <div className="d-flex align-items-center gap-2">
                    <h1 className="fw-bold">{product.title}</h1>
                    <span className="badge text-bg-warning">{product.category}</span>
                </div>
                <p className="fs-6 fw-bold bg-warning-subtle text-start m-0">{product.description}</p>
                <p className="fs-6 text-body-secondary py-2 m-0">{product.content}</p>
                <div className="d-flex my-2">
                    <p className="fw-bold fs-">
                        <span className="border border-2 px-2 rounded-1 mx-1 bg-secondary-subtle">售價</span>
                        NT.{product.price} 
                        <span className="ms-2 text-decoration-line-through text-body-tertiary fs-6 fw-medium">
                            NT.{product.origin_price}
                        </span>
                    </p>                    
                </div>
                
                <div className="d-flex gap-3 border-top pt-3 align-items-center">
                    <select 
                        className="form-select mb-3 w-50" aria-label="Large select example"
                        value={cartQty}
                        onChange={(e)=>setCartQty(e.target.value)}    
                    >
                        <option hidden>請選擇數量</option>
                        {Array.from({length:product.num},(_,i)=>(
                            <option value={i + 1} key={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                    <p className="text-body-secondary fs-6">現貨數量: {product.num}</p>
                </div>
                <button type="button" className="btn btn-warning w-50 mt-2" 
                    onClick={()=> addCart(product.id)}
                    disabled={Number(cartQty) <= 0 || !cartQty || loading}
                >
                    加入購物車
                    {loading && <span className="spinner-border spinner-border-sm"></span>}
                </button>

                {/* {JSON.stringify(product)} */}
            </div>
        </div>
    </>)
}

export default ProductDetails;
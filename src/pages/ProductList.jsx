import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Pagination from "../components/Pagination";


const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [pageInfo, setpageInfo] = useState({});

    //取得產品列表
    const getProducts = async (page = 1) => {
        try {
        const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/products?page=${page}`);      
        setProducts(res.data.products);
        setpageInfo(res.data.pagination);
        } catch (error) {
        console.log(error.message);
        }
    }

    useEffect(()=>{
        getProducts();
    },[])

    return (<div className="container my-5 py-5">
        <h2 className="py-5 fw-bold">產品列表</h2>
        <table className="container py-3">
            <thead>
                <tr>
                    <th>產品名稱</th>
                    <th>優惠價</th>
                    <th>產品照片</th>
                    <th>產品詳情</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product)=>{
                    return <tr key={product.id}>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td><img src={product.imageUrl} alt="" width={200}/></td>
                        <td>
                            <Link to={`/productDetails/${product.id}`}>點擊查看🔍</Link>
                        </td>
                    </tr>
                })}                
            </tbody>
        </table>
        <div className="pb-3 mb-5 d-flex justify-content-center">
            <Pagination pageInfo={pageInfo} getProducts={getProducts}/>
        </div>
        
    </div>);
}

export default ProductList;
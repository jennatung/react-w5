import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;


function ProtectedRoute({ children }){
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    
    //刷新後執行登入驗證
    useEffect(()=>{
        const token = document.cookie.split("; ")
        .find((row)=>row.startsWith("hexToken="))
        ?.split("=")[1];
        if (token) {
        axios.defaults.headers.common.Authorization = token;
        }
        const checkLogin = async () => {
            try {
                const res = await axios.post(`${API_BASE}/api/user/check`);
                setIsAuth(true);
            } catch (error) {
               console.log(error.response?.data.message);
            }finally{
                setLoading(false);
            }
        }
        checkLogin();
    },[])    

    if(loading) return (
        <div className="d-flex justify-content-center py-5">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
    if(!isAuth) return <Navigate to="/admin" />

    return children;
}

export default ProtectedRoute;

import { Outlet, NavLink,useNavigate } from "react-router";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

function AdminLayout(){
    const navigate = useNavigate();

    //提交登入
    const handleLogout = async () => {
        try{
            const res = await axios.post(`${API_BASE}/logout`);
            const {token, expired} = res.data;
            document.cookie = `hexToken=; expires=${new Date(expired)};`;
            delete axios.defaults.headers.common['Authorization'];
            navigate('/');
        }catch(error){
            console.log(error);
        }
    }
    return(<>
        <header className="bg-warning-subtle py-2">
            <ul className="nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/product">產品列表</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/order">訂單列表</NavLink>
                </li>
                <li className="nav-item ms-auto me-3">
                    <button type="button" className="btn btn-warning" onClick={handleLogout}>管理員登出</button>
                </li>
            </ul>
        </header>
        <Outlet />
    </>)
}

export default AdminLayout;
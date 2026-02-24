import { Outlet, NavLink } from "react-router";

function AdminLayout(){
    return(<>
        <header className="bg-warning-subtle">
            <ul className="nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/product">產品列表</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/order">訂單列表</NavLink>
                </li>
            </ul>
        </header>
        <Outlet />
    </>)
}

export default AdminLayout;
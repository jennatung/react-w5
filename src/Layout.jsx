import { Outlet, NavLink } from "react-router";

function Layout (){
    return(<>
        <div className="d-flex gap-2 p-3 bg-warning-subtle align-items-center">
            <p className="m-0 fw-bold fs-4 pe-1">在地小農蔬果鋪🥑</p>
            <NavLink to="/">首頁</NavLink>
            <NavLink to="/productList">產品頁</NavLink>
            <NavLink to="/cart" className="me-auto">購物車</NavLink>            
        </div>
        <Outlet />
        <div className="d-flex py-3 px-5 bg-warning-subtle justify-content-between align-items-center fixed-bottom">
            <h1>🍏🍐🍑🍒🍓🍅🌽</h1>
            <NavLink to="/admin">管理員登入</NavLink>
        </div>
    </>)
}

export default Layout;
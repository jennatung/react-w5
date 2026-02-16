import { NavLink } from "react-router";
import successImg from "../assets/order-success.jpg";

const OrderSuccess = () => {
    return <>
        <div className="container py-5 d-flex gap-5 mb-3">
            <div className="row py-5 mb-5">
                <div className="col-6">
                    <img src={successImg} alt="success" className="img-fluid rounded-4" />
                </div>
                <div className="col-6">
                    <div className="d-flex flex-column justify-content-center align-items-center h-100 gap-2">
                        <h2 className="fw-bold">預定成功! 😀</h2>
                        <NavLink to="/" className="btn btn-success w-50">回首頁</NavLink>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default OrderSuccess;
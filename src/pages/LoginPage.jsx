import axios from "axios";
import { useForm } from "react-hook-form";

const API_BASE = import.meta.env.VITE_API_BASE;

function LoginPage({setIsAuth, getProducts}){
  const { 
    register, 
    handleSubmit,
    formState:{errors}
  } = useForm({
    defaultValues: {
    username: "",
    password: ""
    },mode: 'onChange',
  });

  //提交登入
  const onSubmit = async (data) => {
    try{
      const res = await axios.post(`${API_BASE}/admin/signin`, data);
      const {token, expired} = res.data;
      document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
      axios.defaults.headers.common['Authorization'] = token;
      getProducts();
      setIsAuth(true);
    }catch(error){
      setIsAuth(false);
      alert(error.response.data.message);
      console.log(error);
    }
  }

    return (
        <div className="container login">
          <h1 className="fs-5 fw-bold">請先登入</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating mb-3">
              <input type="email" className={`form-control ${errors.username && "border border-danger"}`} name="username" placeholder="name@example.com" autoComplete="username" 
              {...register("username",{
                required: "請輸入帳號",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "請輸入有效的 Email 格式",
                },
              })}
              />
              {errors.username && (<div className="text-danger pt-1">{errors.username.message}</div>)}
              <label htmlFor="username">Email address</label>
            </div>

            <div className="form-floating">
              <input type="password" className={`form-control ${errors.password && "border border-danger"}`} name="password" placeholder="Password" autoComplete="current-password" 
              {...register("password",{
                required: "請輸入密碼"
              })}
              />
              {errors.password && (<div className="text-danger pt-1">{errors.password.message}</div>)}
              <label htmlFor="password">Password</label>
            </div>
            <button type="submit" className="btn btn-primary my-3 w-100">登入</button>
          </form>
        </div>      
      )
}

export default LoginPage;


import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
axios.defaults.baseURL = VITE_BASE_URL;

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  function auth() {
    // Eslint 可忽略，程式碼仍可正常運作
    const mytoken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    axios.defaults.headers.common["Authorization"] = mytoken;
  }

  // post admin signin 立即執行函式
  // function onSubmit(data) {
  //   (async () => {
  //     try {
  //       const res = await axios.post(`${VITE_BASE_URL}/admin/signin`, data);
  //       console.log("登入成功");
  //       document.cookie = `token=${res.data.token}; expires=${new Date(res.data.expired)}`;
  //       axios.defaults.headers.common["Authorization"] = res.data.token;
  //     } catch (err) {
  //       console.log("登入失敗");
  //     }
  //   })();
  // }

  // login btn handler
  function onSubmit(loginData) {
    postAdminSignin(loginData);
  }

  // post admin signin 非同步函式直接包在外面
  async function postAdminSignin(loginData) {
    try {
      const res = await axios.post(`admin/signin`, loginData);
      console.log("登入成功");

      // Eslint 可忽略，程式碼仍可正常運作
      document.cookie = `token=${res.data.token}; expires=${new Date(res.data.expired)}`;
      auth();
      await postUserCheck();
      navigate("/app");
    } catch (err) {
      console.log("登入失敗");
    }
  }

  // post user check
  async function postUserCheck() {
    try {
      await axios.post(`api/user/check`);
      console.log("登入驗證成功");
    } catch (error) {
      console.log("登入驗證失敗");
      console.error(error);
    }
  }

  return (
    <>
      <div className="container login">
        <div className="row justify-content-center">
          {/* 標題 */}
          <h1 className="h3 mb-3 font-weight-normal text-center">請先登入</h1>
          {/* 登入表單 */}
          <div className="col-8">
            {/* 表單 */}
            <form
              id="form"
              className="form-signin"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* 帳號 */}
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  placeholder="帳號"
                  {...register("username")}
                />
                <label htmlFor="username">Email address</label>
              </div>
              {/* 密碼 */}
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="密碼"
                  {...register("password")}
                />
                <label htmlFor="password">Password</label>
              </div>
              {/* CTA */}
              <button
                className="btn btn-lg btn-primary w-100 mt-3"
                type="submit"
              >
                登入
              </button>
            </form>
          </div>
        </div>
        <p className="mt-5 mb-3 text-muted text-center">&copy; Joseph Chiou</p>
      </div>
    </>
  );
}

export default Login;

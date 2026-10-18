import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import axios from "axios";

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
axios.defaults.baseURL = VITE_BASE_URL;

function Nav() {
  const navigate = useNavigate();

  // token
  function auth() {
    // Eslint 可忽略，程式碼仍可正常運作
    const mytoken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    axios.defaults.headers.common["Authorization"] = mytoken;
  }

  async function postLogout() {
    try {
      const res = await axios.post(`logout`);

      // 清除 Cookie 中的 token
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // 如果你有設定 axios header，也可以順便清空
      delete axios.defaults.headers.common["Authorization"];

      // 導向回登入頁
      navigate("/");
      console.log("登出成功");
    } catch (error) {
      console.log("登出失敗");
      console.dir(error);
    }
  }

  useEffect(() => {
    auth();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">Joseph Chiou</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/app">
                  商品
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={postLogout}
                >
                  登出
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;

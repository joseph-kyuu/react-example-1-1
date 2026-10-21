import { Link, useNavigate, useSubmit } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Login from "../pages/Login";
import axios from "axios";
import { AuthContext } from "../main";

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
axios.defaults.baseURL = VITE_BASE_URL;

function Nav() {
  const navigate = useNavigate();
  const { authToken, setAuthToken } = useContext(AuthContext);

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
      setAuthToken("");
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
          <Link className="navbar-brand" to="/">
            Joseph Chiou
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  首頁
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productsList">
                  商品
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cartList">
                  購物車
                </Link>
              </li>
              {authToken ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/productsListAdmin">
                      商品管理
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
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    登入後台
                  </Link>
                </li>
              )}
              {}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;

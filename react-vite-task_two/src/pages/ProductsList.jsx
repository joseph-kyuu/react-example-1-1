import { useState, useEffect } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
axios.defaults.baseURL = VITE_BASE_URL;

function ProductsList() {
  {
    console.log("渲染元件");
  }

  const [products, setproducts] = useState([]);
  const [tempProduct, setTempProduct] = useState({});
  const navigate = useNavigate();

  // token
  function auth() {
    // Eslint 可忽略，程式碼仍可正常運作
    const mytoken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    if (!mytoken) {
      navigate("/");
      return;
    }
    axios.defaults.headers.common["Authorization"] = mytoken;
  }

  // get admin products
  async function getAdminProducts() {
    try {
      const res = await axios.get(`api/${VITE_API_PATH}/admin/products`);
      setproducts(res.data.products);

      console.log("取得後台商品成功");
    } catch (error) {
      console.log("取得後台商品失敗");
    }
  }

  useEffect(() => {
    auth();
    getAdminProducts();
  }, []);

  return (
    <>
      {console.log("渲染JSX")}

      <div className="container">
        <div className="row mt-5">
          {/* 商品列表 */}
          <div className="col-md-6">
            <h2 className="text-center">商品列表</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>商品圖片</th>
                  <th>商品名稱</th>
                  <th>原價</th>
                  <th>售價</th>
                  <th>是否啟用</th>
                  <th>商品詳情</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td className="w-25">
                        <img
                          className="w-100"
                          src={product.imageUrl}
                          alt={product.title}
                        />
                      </td>
                      <td>{product.title}</td>
                      <td>{product.origin_price}</td>
                      <td>{product.price}</td>
                      <td>{product.is_enabled}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => {
                            setTempProduct(product);
                          }}
                        >
                          商品詳情
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* 商品詳情 */}
          <div className="col-md-6">
            <h2 className="text-center">商品詳情</h2>
            <div>
              {tempProduct.id ? (
                <>
                  <h2>{tempProduct.title}</h2>
                  <img
                    className="w-50"
                    src={tempProduct.imageUrl}
                    alt="商品照片"
                  />
                  <p>{tempProduct.content}</p>
                  <p>{tempProduct.description}</p>
                  <p>
                    <span className="me-3 fs-4">
                      {tempProduct.origin_price}
                    </span>
                    <small>{tempProduct.price}</small>
                  </p>
                </>
              ) : (
                <p className="text-center">請點擊商品詳情按鈕，以顯示商品</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsList;

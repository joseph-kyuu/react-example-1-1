import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// 環境變數
const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
axios.defaults.baseURL = VITE_BASE_URL;

function ProductsList() {
  // 儲存商品資料
  const [products, setProdcuts] = useState([]);
  // 載入
  const [allLoading, setAllLoading] = useState(false);

  // get products all
  async function getProductsAll() {
    try {
      setAllLoading(true);
      const res = await axios.get(`api/${VITE_API_PATH}/products/all`);
      setProdcuts(res.data.products);

      console.log("取得商品成功");
    } catch (error) {
      console.log("取得商品失敗");
    } finally {
      setAllLoading(false);
    }
  }

  // 網路請求
  useEffect(() => {
    getProductsAll();
  }, []);

  return (
    <>
      {allLoading ? (
        <>
          <div className="text-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </>
      ) : (
        <div className="container py-5">
          <div className="row row-cols-3">
            {products.map((product) => {
              return (
                <div className="col gy-3" key={product.id}>
                  <div className="card">
                    <img
                      src={product.imageUrl}
                      className="card-img-top"
                      // 卡片圖片尺寸不一
                      style={{
                        width: "100%",
                        height: "275px",
                        objectFit: "cover",
                      }}
                      alt={product.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">{product.description}</p>
                      {/* 卡片介紹文字不一 */}
                      <p className="card-text text-truncate ">
                        {product.content}
                      </p>
                      <Link
                        className="btn btn-primary"
                        to={`/productDetail/${product.id}`}
                      >
                        商品詳情
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsList;

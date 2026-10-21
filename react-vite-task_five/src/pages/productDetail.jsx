import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

// 環境變數
const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
axios.defaults.baseURL = VITE_BASE_URL;

function ProductDetail() {
  // 取得網址參數
  const { id } = useParams();
  // 單一商品資料
  const [product, setProduct] = useState({});
  // 商品數量
  const [qty, setQty] = useState(1);
  // 購物車資料
  const cartData = {
    data: {
      product_id: id,
      qty,
    },
  };

  // get product
  async function getProduct() {
    try {
      const res = await axios(`api/${VITE_API_PATH}/product/${id}`);
      setProduct(res.data.product);
      console.log("取得單一商品成功");
    } catch (error) {
      console.log("取得單一商品失敗");
      console.dir(error);
    }
  }

  // post cart
  async function postCart() {
    try {
      const res = await axios.post(`api/${VITE_API_PATH}/cart`, cartData);
      console.log("商品加入購物車成功");
      console.log(res);
    } catch (error) {
      console.log("商品加入購物車失敗");
    }
  }

  // 網路請求
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {console.log("測試:", cartData)}
      <div className="container py-5">
        <div>
          <div>
            <img className="w-100" src={product.imageUrl} alt="" />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.content}</p>
            <p>
              <span className="fs-2 text-primary">{product.price} </span>
              <span className="text-decoration-line-through">
                {product.origin_price}
              </span>
            </p>
            <div className="mb-4">
              <button
                onClick={() => {
                  setQty(qty + 1);
                }}
              >
                +
              </button>
              <input
                className="text-center"
                type="number"
                disabled
                value={qty}
              />
              <button
                disabled={qty === 1}
                onClick={() => {
                  setQty(qty - 1);
                }}
              >
                -
              </button>
            </div>

            <button className="btn btn-primary" onClick={postCart}>
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;

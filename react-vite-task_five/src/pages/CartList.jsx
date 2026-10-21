import { useState, useEffect } from "react";
import axios from "axios";

// 環境變數
const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
axios.defaults.baseURL = VITE_BASE_URL;

function CartList() {
  // 購物車列表資料
  const [carts, setCart] = useState([]);
  // 購物車總金額
  const [total, setTotal] = useState(0);

  // get cart
  async function getCart() {
    try {
      const res = await axios.get(`api/${VITE_API_PATH}/cart`);

      setCart(res.data.data.carts);
      setTotal(res.data.data.total);
      console.log("取得購物車列表成功");
    } catch (error) {
      console.log("取得購物車列表失敗");
    }
  }

  // 網路請求
  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <div className="container">
        <table className="table mb-0 table-hover table-bg table-color mb-3">
          {/* 表頭 */}
          <thead>
            <tr>
              <th scope="col">圖片</th>
              <th scope="col">名稱</th>
              <th scope="col">數量</th>
              <th scope="col">單價</th>
              <th scope="col">總計</th>
              <th scope="col">刪除按鈕</th>
            </tr>
          </thead>
          {/* 表體 */}
          <tbody>
            {carts.map((cart) => {
              return (
                <tr key={cart.id}>
                  <td className="w-50">
                    <img
                      className="w-25"
                      src={cart.product.imageUrl}
                      alt="商品主圖"
                    />
                  </td>
                  <td>{cart.product.title}</td>
                  <td>{cart.product.price}</td>
                  <td>{cart.qty}</td>
                  <td>{cart.total}</td>
                  <td>
                    <button type="button">刪除商品</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* 表尾 */}
          <tfoot>
            <tr>
              <td>
                <button type="button">刪除全部商品</button>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <span className="text-danger fs-5">實際付款金額:{total}</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default CartList;

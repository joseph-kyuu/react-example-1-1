import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

// 環境變數
const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
axios.defaults.baseURL = VITE_BASE_URL;

// 元件
function CartList() {
  // 購物車列表資料
  const [carts, setCart] = useState([]);
  // 購物車總金額
  const [total, setTotal] = useState(0);
  // 表單
  const { register, handleSubmit, reset } = useForm();

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

  // put cart
  async function putCart(qty, cartId, productId) {
    try {
      const qtyData = {
        data: {
          product_id: productId,
          qty,
        },
      };
      const res = await axios.put(
        `api/${VITE_API_PATH}/cart/${cartId}`,
        qtyData,
      );

      console.log("修改商品數量成功");
      getCart();
    } catch (error) {
      console.log("修改商品數量失敗");
    }
  }

  // post order
  async function postOrder(data) {
    try {
      const res = await axios.post(`api/${VITE_API_PATH}/order`, data);
      console.log("訂單成立成功");
      await postPay(res.data.orderId);
      getCart();
    } catch (error) {
      console.log("訂單成立失敗");
    }
  }

  // post pay
  async function postPay(orderId) {
    try {
      const res = await axios.post(`api/${VITE_API_PATH}/pay/${orderId}`);
      console.log(res);
      console.log("訂單結帳成功");
    } catch (error) {
      console.log("訂單結帳失敗");
    }
  }

  // onSubmitCheckoutHandler
  function onSubmitCheckoutHandler(data) {
    postOrder({
      data: {
        user: {
          name: data.name,
          email: data.email,
          tel: data.email,
          address: data.address,
        },
        message: "這是留言",
      },
    });
    reset({
      name: "",
      email: "",
      tel: "",
      address: "",
    });
  }

  // 網路請求
  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <div className="container">
        {/* 購物車 */}
        <div className="mb-5 py-5">
          <div className="mb-3 text-center">
            <h2>購物車</h2>
          </div>
          <table className="table mb-0 table-hover table-bg table-color mb-3">
            {/* 表頭 */}
            <thead>
              <tr>
                <th scope="col">圖片</th>
                <th scope="col">名稱</th>
                <th scope="col">單價</th>
                <th scope="col">數量</th>
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
                    <td className="w-10">
                      <button
                        onClick={() => {
                          putCart(cart.qty + 1, cart.id, cart.product_id);
                        }}
                      >
                        +
                      </button>
                      <input
                        className="text-center w-50"
                        type="number"
                        disabled
                        value={cart.qty}
                      />
                      <button
                        onClick={() => {
                          putCart(cart.qty - 1, cart.id, cart.product_id);
                        }}
                      >
                        -
                      </button>
                    </td>
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
        {/* 訂單資料 */}
        <div>
          <div className="mb-3 text-center">
            <h2>訂單資料</h2>
          </div>
          <form className="container w-50">
            <div className="mb-3">
              <label for="name" className="form-label">
                姓名
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                {...register("name")}
              />
            </div>
            <div className="mb-3">
              <label for="email" className="form-label">
                電子郵件
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                {...register("email")}
              />
            </div>
            <div className="mb-3">
              <label for="tel" className="form-label">
                電話
              </label>
              <input
                type="tel"
                className="form-control"
                id="tel"
                {...register("tel")}
              />
            </div>
            <div className="mb-3">
              <label for="address" className="form-label">
                地址
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                {...register("address")}
              />
            </div>
            <div className="mb-3 text-center">
              <button
                className="btn btn-primary"
                onClick={handleSubmit(onSubmitCheckoutHandler)}
              >
                送出訂單
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CartList;

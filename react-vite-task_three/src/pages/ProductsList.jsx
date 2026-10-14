import axios from "axios";
import * as bootstrap from "bootstrap";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
axios.defaults.baseURL = VITE_BASE_URL;

function ProductsList() {
  {
    console.log("渲染元件");
  }

  // 儲存後台全部商品
  const [products, setproducts] = useState([]);
  // 儲存後台單一商品資料
  const [tempProduct, setTempProduct] = useState({});
  // 判斷按鈕模式
  const [buttonMode, setButtonMode] = useState("");
  const navigate = useNavigate();
  // 儲存 modifyModal 節點
  const modifyModalNode = useRef(null);
  // 儲存 BS5 的 modifyModal 實體
  const modifyModal = useRef(null);
  // useForm
  const { register, handleSubmit, reset } = useForm();

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

  // post admin product
  async function postAdminProduct(data) {
    try {
      await axios.post(`api/${VITE_API_PATH}/admin/product`, data);
      console.log("新增商品成功");
      await getAdminProducts();
      closeModifyModalHandler();
    } catch (error) {
      console.dir(error);
      console.log("新增商品失敗");
    }
  }

  useEffect(() => {
    auth();
    getAdminProducts();
  }, []);

  //  建立 BS5 的 modal 實體
  useEffect(() => {
    modifyModal.current = new bootstrap.Modal(modifyModalNode.current);
    console.log(modifyModal.current);
  }, []);

  // 開啟 modifyModal handler
  function openModifyModalHandler(e, product) {
    if (e.target.name === "新增") {
      // 空商品資料
      const emptyProduct = {
        title: "",
        category: "",
        origin_price: "",
        price: "",
        unit: "",
        description: "",
        content: "",
        is_enabled: 0,
        imageUrl: "https://picsum.photos/200",
        imagesUrl: [
          "https://picsum.photos/200",
          "https://picsum.photos/200",
          "https://picsum.photos/200",
          "https://picsum.photos/200",
          "https://picsum.photos/200",
        ],
      };
      reset(emptyProduct);
    } else {
      console.dir(e.target.name);
      console.log(product);
      reset({
        title: product.title,
        category: product.category,
        origin_price: product.origin_price,
        price: product.price,
        unit: product.unit,
        description: product.description,
        content: product.content,
        is_enabled: product.is_enabled,
        imageUrl: product.imageUrl,
        imagesUrl: [product.imagesUrl],
      });
    }
    modifyModal.current.show();
  }

  // 關閉 modifyModal handler
  function closeModifyModalHandler() {
    modifyModal.current.hide();
  }

  // onsubmit handler
  function onsubmitHandler(data) {
    // 建議使用展開語法...data
    const convertData = {
      data: {
        title: data.title,
        category: data.category,
        origin_price: Number(data.origin_price),
        price: Number(data.price),
        unit: data.unit,
        description: data.description,
        content: data.content,
        is_enabled: Number(data.is_enabled),
        imageUrl: data.imageUrl,
        imagesUrl: [
          "圖片網址一",
          "圖片網址二",
          "圖片網址三",
          "圖片網址四",
          "圖片網址五",
        ],
      },
    };
    postAdminProduct(convertData);
  }

  return (
    <>
      {console.log("渲染JSX")}
      {}
      <div className="container">
        <div className="row mt-5">
          {/* 商品列表 */}
          <div className="col-md-7">
            <h2 className="text-center">商品列表</h2>
            <div className="text-end">
              <button
                className="btn btn-info "
                type="button"
                name="新增"
                onClick={openModifyModalHandler}
              >
                新增商品
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>商品圖片</th>
                  <th>商品名稱</th>
                  <th>原價</th>
                  <th>售價</th>
                  <th>是否啟用</th>
                  <th>詳情</th>
                  <th>編輯</th>
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
                          className="btn btn-primary"
                          type="button"
                          onClick={() => {
                            setTempProduct(product);
                          }}
                        >
                          商品詳情
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning"
                          type="button"
                          name="編輯"
                          onClick={(e) => {
                            openModifyModalHandler(e, product);
                          }}
                        >
                          編輯商品
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* 商品詳情 */}
          <div className="col-md-5">
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
      {/* modal 區塊*/}
      {/* 新增、修改*/}
      <div
        className="modal fade"
        id="modifyModalNode"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={modifyModalNode}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content border-0">
            <div className="modal-header bg-dark text-white">
              <h5 id="productModalLabel" className="modal-title">
                <span>新增商品</span>
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeModifyModalHandler}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-4">
                  <div className="mb-2">
                    <div className="mb-3">
                      <label htmlFor="imageUrl" className="form-label">
                        輸入主圖片網址
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="請輸入圖片連結"
                        {...register("imageUrl")}
                      />
                    </div>
                    <img className="img-fluid" src="" alt="" />
                  </div>
                  <div className="mb-2">
                    <div className="mb-3">
                      <label htmlFor="imageUrl" className="form-label">
                        輸入主圖片網址
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="請輸入圖片連結"
                        {...register("imagesUrl")}
                      />
                    </div>
                    <img className="img-fluid" src="" alt="" />
                  </div>
                  <div>
                    <button className="btn btn-outline-primary btn-sm d-block w-100">
                      新增圖片
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-outline-danger btn-sm d-block w-100">
                      刪除圖片
                    </button>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      標題
                    </label>
                    <input
                      id="title"
                      type="text"
                      className="form-control"
                      placeholder="請輸入標題"
                      {...register("title")}
                    />
                  </div>

                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="category" className="form-label">
                        分類
                      </label>
                      <input
                        id="category"
                        type="text"
                        className="form-control"
                        placeholder="請輸入分類"
                        {...register("category")}
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="unit" className="form-label">
                        單位
                      </label>
                      <input
                        id="unit"
                        type="text"
                        className="form-control"
                        placeholder="請輸入單位"
                        {...register("unit")}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="origin_price" className="form-label">
                        原價
                      </label>
                      <input
                        id="origin_price"
                        type="text"
                        min="0"
                        className="form-control"
                        placeholder="請輸入原價"
                        {...register("origin_price")}
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="price" className="form-label">
                        售價
                      </label>
                      <input
                        id="price"
                        type="text"
                        min="0"
                        className="form-control"
                        placeholder="請輸入售價"
                        {...register("price")}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      產品描述
                    </label>
                    <textarea
                      id="description"
                      className="form-control"
                      placeholder="請輸入產品描述"
                      {...register("description")}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                      說明內容
                    </label>
                    <textarea
                      id="content"
                      className="form-control"
                      placeholder="請輸入說明內容"
                      {...register("content")}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        id="is_enabled"
                        className="form-check-input"
                        type="checkbox"
                        {...register("is_enabled")}
                      />
                      <label className="form-check-label" htmlFor="is_enabled">
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={closeModifyModalHandler}
              >
                取消
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit(onsubmitHandler)}
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsList;

/*
    1.使用資料和 map()渲染<tr>。
    2.
    */

// 資料
const products = [
  {
    category: "甜甜圈",
    content: "尺寸：14x14cm",
    description:
      "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",
    id: "-L9tH8jxVb2Ka_DYPwng",
    is_enabled: 1,
    origin_price: 150,
    price: 99,
    title: "草莓莓果夾心圈",
    unit: "元",
    num: 10,
    imageUrl: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8",
    imagesUrl: [
      "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a",
      "https://images.unsplash.com/photo-1559656914-a30970c1affd",
    ],
  },
  {
    category: "蛋糕",
    content: "尺寸：6寸",
    description:
      "蜜蜂蜜蛋糕，夾層夾上酸酸甜甜的檸檬餡，清爽可口的滋味讓人口水直流！",
    id: "-McJ-VvcwfN1_Ye_NtVA",
    is_enabled: 1,
    origin_price: 1000,
    price: 900,
    title: "蜂蜜檸檬蛋糕",
    unit: "個",
    num: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
    imagesUrl: [
      "https://images.unsplash.com/photo-1618888007540-2bdead974bbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
    ],
  },
  {
    category: "蛋糕",
    content: "尺寸：6寸",
    description: "法式煎薄餅加上濃郁可可醬，呈現經典的美味及口感。",
    id: "-McJ-VyqaFlLzUMmpPpm",
    is_enabled: 1,
    origin_price: 700,
    price: 600,
    title: "暗黑千層",
    unit: "個",
    num: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
    imagesUrl: [
      "https://images.unsplash.com/flagged/photo-1557234985-425e10c9d7f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxjYWtlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
      "https://images.unsplash.com/photo-1540337706094-da10342c93d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
    ],
  },
];

// 5.定義根元件 App
const App = function () {
  console.log("元件渲染");

  // 從 React 物件中取得 Hook，建立區域變數
  const useState = React.useState;
  // const useEffect = React.useEffect;

  // hook
  const [productDetail, setProductDetail] = useState("");

  // JSX
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6">
            <h2 className="text-center">商品列表</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>商品名稱</th>
                  <th>原價</th>
                  <th>售價</th>
                  <th>是否啟用</th>
                  <th>商品詳情</th>
                </tr>
              </thead>
              <tbody>
                {products.map(function (product) {
                  return (
                    <tr key={product.id}>
                      <td>{product.title}</td>
                      <td>{product.origin_price}</td>
                      <td>{product.price}</td>
                      <td>{product.is_enabled ? "啟用" : "關閉"}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={function () {
                            setProductDetail(product);
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
          <div className="col-md-6">
            <h2 className="text-center">商品詳情</h2>
            {productDetail ? (
              <div>
                <h2>{productDetail.title}</h2>
                <img src={productDetail.imageUrl} alt="商品照片" />
                <p>{productDetail.description}</p>
                <p>
                  <span className="me-3 fs-4">
                    售價：{productDetail.price}元/個
                  </span>
                  <small>
                    原價：
                    <span className="text-decoration-line-through me-3">
                      {productDetail.origin_price}
                    </span>
                    元/個
                  </small>
                </p>
                {productDetail.imagesUrl.map(function (item, index) {
                  return (
                    <img
                      className="images"
                      src={item}
                      alt="商品照"
                      key={index}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-secondary">請點擊任一查看商品詳情按鈕</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// 6.取得根容器 DOM 節點
const rootEl = document.querySelector("#App");

// 7.建立 React Root 物件
// root 是 React UI Tree 的入口 / 根
const root = ReactDOM.createRoot(rootEl);

// 8.將 App 元件掛載到 React Root
// React 開始管理這個 DOM 容器裡的 UI
root.render(<App />);

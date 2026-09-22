// 資料
const todoItems = [
  {
    id: 1,
    content: "我是卡斯伯",
  },
  {
    id: 2,
    content: "我是小明",
  },
];

// 取得DOM
const todo = document.querySelector(".todo");
const add = document.querySelector(".add");
const newTodo = document.querySelector(".new-todo");

// 渲染功能
function render() {
  let renderString = "";
  todoItems.forEach(function (todoItem, index) {
    renderString += `<li id=${todoItem.id} >${todoItem.content} <button class="delete" type='button' data-index=${index}>刪除按鈕</button>
    </li>`;
  });
  todo.innerHTML = renderString;
}
render();

// 新增功能
function addNewTodo(content) {
  let index = todoItems.length + 1;
  console.log(index);
  let newTodo = {
    id: index,
    content,
  };
  todoItems.push(newTodo);
  render();
}

add.addEventListener("click", function () {
  let newAddTodo = newTodo.value;
  addNewTodo(newAddTodo);
});

// 刪除功能
function deleteTodo(index) {
  todoItems.splice(index, 1);
  render();
}

todo.addEventListener("click", function (e) {
  deleteTodo(e.target.dataset.index);
});

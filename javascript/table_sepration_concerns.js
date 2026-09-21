/*
===========
!!!!! 資料 !!!!!
===========
*/

const tasks = [
  {
    date: "2021-04-28",
    name: "卡斯伯",
    task: "Vue 作品實戰直播班 2021 夏季 - 報到",
    isFeedback: false,
  },
  {
    date: "2021-04-27",
    name: "小明",
    task: "Vue 作品實戰直播班 2021 夏季 - 報到",
    isFeedback: true,
  },
  {
    date: "2021-04-27",
    name: "漂亮阿姨",
    task: "Vue 作品實戰直播班 2021 夏季 - 報到",
    isFeedback: true,
  },
];

/*
===========
!!!!! 取得節點 !!!!!
===========
*/

// 表格節點
const tableTwo = document.querySelector(".tbody-two");

// 取得資料按鈕
const getData = document.querySelector("#getData");

// 新增資料按鈕
const pushData = document.querySelector("#pushData");

/*
===========
!!!!! 渲染功能 !!!!!
===========
*/
function render() {
  let renderString = "";
  tasks.forEach(function (task) {
    renderString += `<tr>
      <td>${task.date}</td>
      <td>${task.name}</td>
      <td>${task.task}</td>
      <td>${task.isFeedback ? "已批改" : "未批改"}</td>
    </tr>`;
  });
  tableTwo.innerHTML = renderString;
}
render();

/*
===========
!!!!! 取得功能 !!!!!
===========
*/
function printTasks() {
  console.log(tasks);
}

getData.addEventListener("click", printTasks);

/*
===========
!!!!! 新增功能 !!!!!
===========
*/
function addTask() {
  let newTask = {
    date: "2021-04-28",
    name: "新名稱",
    task: "Vue 作品實戰直播班 2021 夏季 - 報到",
    isFeedback: false,
  };

  tasks.push(newTask);
  render();
}

pushData.addEventListener("click", addTask);

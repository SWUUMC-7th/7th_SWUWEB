// 요소 가져오기
const todoInput = document.getElementById("todo-input");
const todoItemsList = document.getElementById("todo-items");
const completedItemsList = document.getElementById("completed-items");

// 할 일 추가 함수
function addTodo() {
  const inputText = todoInput.value.trim(); // 공백 제거
  if (inputText !== "") {
    // todo-item 요소 생성
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");

    const taskText = document.createElement("p");
    taskText.textContent = inputText;

    const doneButton = document.createElement("button");
    doneButton.textContent = "완료";
    doneButton.classList.add("done-button");
    doneButton.onclick = () => completeTodo(todoItem);

    todoItem.appendChild(taskText);
    todoItem.appendChild(doneButton);
    todoItemsList.appendChild(todoItem);

    // 입력창 비우기
    todoInput.value = "";
  }
}

// 완료된 할 일 처리 함수
function completeTodo(todoItem) {
  // 해야 할 일 리스트에서 항목 제거
  todoItemsList.removeChild(todoItem);

  const completedItem = document.createElement("li");
  completedItem.classList.add("completed-item");

  const taskParagraph = document.createElement("p");
  taskParagraph.textContent = todoItem.querySelector("p").textContent;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "삭제";
  deleteButton.classList.add("delete-button");
  deleteButton.onclick = () => completedItemsList.removeChild(completedItem);

  completedItem.appendChild(taskParagraph);
  completedItem.appendChild(deleteButton);
  completedItemsList.appendChild(completedItem);
}

// Enter 키로 입력 값 가져오기
todoInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

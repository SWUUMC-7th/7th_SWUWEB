document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  const completedList = document.getElementById("completed-list");

  // 할 일 추가
  todoInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter" && todoInput.value.trim() !== "") {
          addTodoItem(todoInput.value.trim());
          todoInput.value = "";
      }
  });

  // 할 일 목록에 항목 추가
  function addTodoItem(text) {
      const listItem = document.createElement("li");
      listItem.className = "todo-item";
      listItem.innerHTML = `
          <span>${text}</span>
          <button class="complete-button">완료</button>
      `;

      listItem.querySelector(".complete-button").addEventListener("click", () => {
          completeTodoItem(listItem);
      });

      todoList.appendChild(listItem);
  }

  // 할 일 완료 처리
  function completeTodoItem(item) {
      item.querySelector(".complete-button").remove();
      item.classList.add("completed");

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "삭제";
      deleteButton.className = "delete-button";
      deleteButton.addEventListener("click", () => {
          item.remove();
      });

      item.appendChild(deleteButton);
      completedList.appendChild(item);
  }
});

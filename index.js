//get elements
let todoInput = document.getElementById("todo-input");
let todoList = document.getElementById("todo-list");

//create array of object
let todosArray = [];

//create add function
document.getElementById("add-button").addEventListener("click", function () {
  if (todoInput.value == "") {
    alert("fill input");
  } else {
    const todoItem = {
      todoDescr: todoInput.value,
      isChecked: false,
    };
    todosArray.push(todoItem);
    todoInput.value = "";
    displayTodo();
    console.log(todosArray);
  }
});

function displayTodo() {
  // Clear the current todo list
  todoList.innerHTML = "";
  // Loop through the todosArray and create elements for each todo
  todosArray.forEach(function (todo, index) {
    // Create a div for each todo item
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    // Create a h2 for the todo description
    const description = document.createElement("h2");
    description.textContent = todo.todoDescr;

    // Create a div for todo actions (checked,delete, edit buttons)
    const todoActions = document.createElement("div");
    todoActions.classList.add("todo-actions");

    // Create a checkbox for marking as done
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isChecked;
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        todosArray[index].isChecked = true;
      } else {
        todosArray[index].isChecked = false;
      }
      checkTodo(index);
    });

    // Create a button for deleting the todo
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("circle", "delete-button");
    deleteButton.innerHTML =
      '<span class="material-symbols-rounded">delete</span>';
    deleteButton.addEventListener("click", function () {
      let isConfirmed = confirm("Do you want to delete the task");
      if (isConfirmed) {
        deleteTodo(index);
      }
    });

    // Create a button for editing the todo
    const editButton = document.createElement("button");
    editButton.classList.add("circle", "edit-button");
    editButton.innerHTML = '<span class="material-symbols-rounded">edit</span>';

    // Append description, delete button, and edit button to todo item
    todoItem.appendChild(checkbox);
    todoItem.appendChild(description);
    todoActions.appendChild(deleteButton);
    todoActions.appendChild(editButton);
    todoItem.appendChild(todoActions);
    todoList.appendChild(todoItem);
    // Update the style based on the completion status
    checkTodo(index);
  });
}

function deleteTodo(index) {
  todosArray.splice(index, 1);
  displayTodo();
}

function checkTodo(index) {
  const description = document.querySelectorAll(".todo-item h2")[index];
  if (todosArray[index].isChecked) {
    description.style.textDecoration = "line-through";
  } else {
    description.style.textDecoration = "none";
  }
}

const mainTodoElement = document.querySelector(".todo-lists-elem");
const inputValue = document.getElementById("inputvalue");

const getTodoListFromLocal = () => {
  return JSON.parse(localStorage.getItem("todoList"));
};

const addTodoListLocalStorage = (localTodoList) => {
    return localStorage.setItem("todoList", JSON.stringify(localTodoList));
}

let localTodoList = getTodoListFromLocal() || [];

const addTodoDynamicElement = (curElem) => {
  const divElement = document.createElement("div");
  divElement.classList.add("main_todo_div");
  divElement.innerHTML = `<li>${curElem}</li> <button class="deleteBtn">Delete</button>`;
  mainTodoElement.append(divElement);
};

const addTodoList = (e) => {
  e.preventDefault();
  // console.log("testing");

  const todoListValue = inputValue.value.trim();
  inputValue.value = "";

  if(todoListValue !== "" && !localTodoList.includes(todoListValue)) {

  // localTodoList = getTodoListFromLocal() || [];
  localTodoList.push(todoListValue);
  localTodoList = [...new Set(localTodoList)];
//   console.log("localTodoList", localTodoList);
  localStorage.setItem("todoList", JSON.stringify(localTodoList));

  // const divElement = document.createElement("div");
  // divElement.classList.add("main_todo_div");
  // divElement.innerHTML = `<li>${inputValue.value}</li> <button class="deleteBtn">Delete</button>`;
  // mainTodoElement.append(divElement);
  addTodoDynamicElement(todoListValue);
  }
};

const showTodoList = () => {
//   console.log("localTodoList", localTodoList);
  localTodoList.forEach((curElem) => {
    addTodoDynamicElement(curElem);
  });
};

showTodoList();

const removeTodoElem = (e) => {
    const todoToRemove = e.target;
    let todoListContent = todoToRemove.previousElementSibling.innerText;
    let parentElem = todoToRemove.parentElement; 
    console.log(todoListContent);

    localTodoList = localTodoList.filter((curTodo) => {
        // console.log("curTodo", curTodo);
        return curTodo !== todoListContent.toLowerCase();;
    });

    addTodoListLocalStorage(localTodoList); 
parentElem.remove();

    console.log(localTodoList);

}

mainTodoElement.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e.target);
    if(e.target.classList.contains("deleteBtn")){
        removeTodoElem(e);

    }
}); 

document.querySelector(".btn").addEventListener("click", (e) => {

  addTodoList(e);
});
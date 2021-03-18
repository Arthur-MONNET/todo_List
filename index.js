

const list = document.querySelector("#todos")
let valid = document.querySelectorAll(".fa-check")


let todos = [
    {
        label: "🍉 Faire les courses",
        done: false
    },
    {
        label: "☎️ Appeler Bernard",
        done:false
    },
    {
        label: "✨ Ranger ma chambre",
        done: false
    }
]
if(localStorage.getItem("todos")){
     todos = JSON.parse(localStorage.getItem("todos"))
}
let sizeList=todos.length;
let newTodo = document.createElement("div");
for (let i=0;i<sizeList;i++) {
    let newTodo = document.createElement("div");

    list.append(newTodo);
    newTodo.classList.add("todo")
    newTodo.innerHTML =`<input type="checkbox" name="valid" value="${i}" id="check${i}" class="check"/><label for="check${sizeList}">${todos[i].label}</label> <i class="fas fa-trash-alt"></i><i class="fas fa-edit"></i>`

    valid = document.querySelectorAll(".fa-check")
    console.log(todos[i].done)

    if(todos[i].done===true){
        newTodo.querySelector("label").classList.add("barre")
        newTodo.querySelector("input").checked="true"
    }
}
let allTodo=Array.from(document.querySelector("#todos").children)

function removeTodo (i) {
    allTodo[i].remove();
    todos.splice(i,1);
}
function createTodo(name){
    todos.push({label: `${name}` , done: false})
    let newTodo = document.createElement("div");
    console.log(todos)
    list.append(newTodo);
    newTodo.classList.add("todo")
    newTodo.innerHTML =`<input type="checkbox" name="valid" value="${sizeList}" id="check${sizeList}" class="check"/><label for="check${sizeList}">${name}</label> <i class="fas fa-trash-alt"></i><i class="fas fa-edit"></i>`
    allTodo.push(newTodo)
    console.log(newTodo, sizeList)
    valid = document.querySelectorAll(".fa-check")
}
let trash=document.querySelectorAll(".fa-trash-alt")

document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("fa-trash-alt")){
        console.log(allTodo.length)
        let i = allTodo.indexOf(e.target.parentElement)
        removeTodo(i)
        sizeList--;
        allTodo=Array.from(document.querySelector("#todos").children)
        console.log(allTodo.length)
        localStorage.setItem("todos", JSON.stringify(todos))
    }

})

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault(); // empêche la soumission du formulaire avec rechargement de page
    const formData = new FormData(e.target);
    createTodo(formData.get("name"))
    sizeList++;
    document.querySelector("#name").value= "";
    localStorage.setItem("todos", JSON.stringify(todos))
    document.querySelector("h4").classList.remove("transitionText")
})
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("check")){
        let i = allTodo.indexOf(e.target.parentElement)
        todos[i].done=!todos[i].done;

        let ciblingText =allTodo[i].querySelector("label")
        ciblingText.classList.toggle("barre")
        localStorage.setItem("todos", JSON.stringify(todos))
        console.log(JSON.stringify(todos))
    }
})

const clearAll=document.querySelector("#clearAll")

clearAll.addEventListener("click", () =>{
    list.innerHTML=``
    allTodo=[]
    todos=[]
    console.log(todos)
    sizeList=0
    localStorage.setItem("todos", JSON.stringify(todos))
})

const validAll=document.querySelector("#validAll")

validAll.addEventListener("click", () =>{
    for (let i=0; i<sizeList;i++){

        todos[i].done=true;

        let ciblingText =allTodo[i].querySelector("label")
        ciblingText.classList.add("barre")
        allTodo[i].querySelector(".check").checked="true"
        console.log(ciblingText)
        console.log(todos[i].done)
        localStorage.setItem("todos", JSON.stringify(todos))
    }
})

document.querySelector("#name").addEventListener("click", () =>{
    document.querySelector("h4").classList.add("transitionText")
})





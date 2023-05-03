//Seleção de elementos
const formAdd = document.querySelector("#form-add");
const inputAdd = document.querySelector("#text-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelBtn = document.querySelector("#cancel-edit-btn");
const btnEdit = document.querySelector("#btnEdit");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");
const alertInput = document.querySelector(".alert-input");

let oldTitleInput;

//Funções

//Function Crianr tarefas
const saveTarefa = (text) => {

    const todo = document.createElement("div")
    todo.classList.add("todo")

    const title = document.createElement("h3")
    title.innerText = text
    todo.appendChild(title)

    const btnConcluido = document.createElement("button")
    btnConcluido.classList.add("finish-todo")
    btnConcluido.innerHTML = '<i class="fa-solid fa-check-circle"></i>'
    todo.appendChild(btnConcluido)

    const btnEdit = document.createElement("button")
    btnEdit.classList.add("edit-todo")
    btnEdit.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(btnEdit)

    const btnRemove = document.createElement("button")
    btnRemove.classList.add("remove-todo")
    btnRemove.innerHTML = '<i class="fa-solid fa-xmark-circle">'
    todo.appendChild(btnRemove)

    todoList.appendChild(todo);
};

//Function Limpando o campo de texto
function clear(){
    inputAdd.value = "";
    inputAdd.focus();
} 

//Function Display de forms
const toggleForms = () => {
    editForm.classList.toggle("hide")
    formAdd.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

//Function Atualizando título da tarefa
const  updateTitle = (text) => {
    const tarefas = document.querySelectorAll(".todo")

    tarefas.forEach((tarefa) => {
        let titleTarefa = tarefa.querySelector("h3")

        if(titleTarefa.innerText === oldTitleInput){
            titleTarefa.innerText = text;
        }
    })
}




//Eventos

//Adicionar Tarefa
formAdd.addEventListener("submit", (evento) => {
    evento.preventDefault();
    
    const inputValue = inputAdd.value;

    if(inputValue){
       saveTarefa(inputValue);
       clear();
    }else{
        alertInput.innerHTML = `<p>Ação inválida! Adicione um título na tarefa.</p>`
    }

})

formAdd.addEventListener("keydowm", (e) => {
    e.preventDefault();

    const inputValue = inputAdd.value;

    if(inputValue){
       saveTarefa(inputValue);
       clear();
    }else{
        alertInput.innerHTML = `<p>Ação inválida! Adicione um título na tarefa.</p>`
    }
    
})

//Remover Tarefa
document.addEventListener("click", (evento) => {
    const targetElement = evento.target;
    const parentElement = targetElement.closest("div");
    let titleInput;

    if(parentElement && parentElement.querySelector("h3")){
        titleInput = parentElement.querySelector("h3").innerText;
    }
    

    if(targetElement.classList.contains("finish-todo")){

        parentElement.classList.toggle("done");
        const btnEdit = parentElement.querySelector(".edit-todo")

        if(parentElement.classList.contains("done")){
            btnEdit.style.display = "none"
        }else{
            btnEdit.style.display = "block"
        }
        
    }

    if(targetElement.classList.contains("edit-todo")){
        toggleForms();

        editInput.value = titleInput
        oldTitleInput = titleInput
    }

    if(targetElement.classList.contains("remove-todo")){
        parentElement.remove();
    }
    
})


//Cancelar Edição
cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
})

//Enviar edição
btnEdit.addEventListener("click", (evento) => {
    evento.preventDefault();

    const editedInputTitle = editInput.value

    if(editedInputTitle){
        updateTitle(editedInputTitle)
    }

    toggleForms();
})



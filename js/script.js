//Seleção de elementos
const formAdd = document.querySelector("#form-add");
const inputAdd = document.querySelector("#text-input");
const tarefaList = document.querySelector("#tarefa-list");
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

//Function Imprimindo tarefas
const saveTarefa = (text, done = 0, save = 1) => {

    const tarefa = document.createElement("div")
    tarefa.classList.add("tarefa")

    const title = document.createElement("h3")
    title.innerText = text
    tarefa.appendChild(title)

    const btnConcluido = document.createElement("button")
    btnConcluido.classList.add("finish-tarefa")
    btnConcluido.innerHTML = '<i class="fa-solid fa-check-circle"></i>'
    tarefa.appendChild(btnConcluido)

    const btnEdit = document.createElement("button")
    btnEdit.classList.add("edit-tarefa")
    btnEdit.innerHTML = '<i class="fa-solid fa-pen"></i>'
    tarefa.appendChild(btnEdit)

    const btnRemove = document.createElement("button")
    btnRemove.classList.add("remove-tarefa")
    btnRemove.innerHTML = '<i class="fa-solid fa-xmark-circle">'
    tarefa.appendChild(btnRemove)

    //Utilizando dados da LocalStorage
    if(done){
        tarefa.classList.add("done")
    }

    if(save){
        saveTarefasLocalStorage({titulo:text, done})
    }

    tarefaList.appendChild(tarefa);
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
    tarefaList.classList.toggle("hide")
}

//Function Atualizar Tarefa
const  updateTarefa = (text) => {
    const tarefas = document.querySelectorAll(".tarefa")

    tarefas.forEach((tarefa) => {
        let titleTarefa = tarefa.querySelector("h3")

        if(titleTarefa.innerText === oldTitleInput){
            titleTarefa.innerText = text;

            updateTarefaLocalStorage(oldTitleInput,text);
        }
    })
}

// Function Pesquisar Tarefa
const getSearchTarefas = (text) => {

    const tarefas = document.querySelectorAll(".tarefa")

    tarefas.forEach((tarefa) => {

        let titleTarefa = tarefa.querySelector("h3").innerText.toLowerCase();
        const normalizeText = text.toLowerCase();

        tarefa.style.display = "flex"

        if(!titleTarefa.includes(normalizeText)){
            tarefa.style.display = "none"
        }
    })
}

//Function Filtrar Tarefas
const filtrarTarefas = (filterText) => {

    const tarefas = document.querySelectorAll(".tarefa")

    switch(filterText){
        case "all":
            tarefas.forEach((tarefa) => tarefa.style.display = "flex")
            break;
        case "done":
            tarefas.forEach((tarefa) =>
                tarefa.classList.contains("done")
                    ?(tarefa.style.display = "flex")
                    :(tarefa.style.display = "none"))
            break;
        case "realize":
            tarefas.forEach((tarefa) =>
                !tarefa.classList.contains("done")
                    ?(tarefa.style.display = "flex")
                    :(tarefa.style.display = "none"))
            break;

        default:
            break;
    }
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
    

    if(targetElement.classList.contains("finish-tarefa")){

        parentElement.classList.toggle("done");
        const btnEdit = parentElement.querySelector(".edit-tarefa")

        if(parentElement.classList.contains("done")){
            btnEdit.style.display = "none"
        }else{
            btnEdit.style.display = "block"
        }

        updateStatusLocalStorage(titleInput);
        
    }

    if(targetElement.classList.contains("edit-tarefa")){
        toggleForms();

        editInput.value = titleInput
        oldTitleInput = titleInput
    }

    if(targetElement.classList.contains("remove-tarefa")){
        parentElement.remove();

        removeTarefaLocalStorage(titleInput);
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
        updateTarefa(editedInputTitle)
    }

    toggleForms();
})

//Pesquisar Tarefa
searchInput.addEventListener("keyup", (evento) => {
    const search = evento.target.value

    getSearchTarefas(search);
})

//Limpar pesquisa
eraseBtn.addEventListener("click", (evt) => {
    evt.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
})

//Filtrar tarefas
filterBtn.addEventListener("change", (evento) => {
    
    const filterValue = evento.target.value

    filtrarTarefas(filterValue);
})

//Salvar dados no Local Storage
const getTarefasLocalStorage = () =>{
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    return tarefas;
}


const saveTarefasLocalStorage = (tarefa) =>{
    const tarefas = getTarefasLocalStorage()

    tarefas.push(tarefa)

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

//Imprimindo dados do Local Storage na tabela de tarefas

const printTarefas = () => {
    const tarefas = getTarefasLocalStorage()

    tarefas.forEach((tarefa) => {
        saveTarefa(tarefa.titulo, tarefa.done, 0);
    })
}

//Remover tarefas do Local Storage
const removeTarefaLocalStorage = (tituloTarefa) => {
    const tarefas = getTarefasLocalStorage()

    const filterTarefas = tarefas.filter((tarefa) => tarefa.titulo !== tituloTarefa)

    localStorage.setItem("tarefas", JSON.stringify(filterTarefas));
}

//Atualizar tarefas Local Storage
const updateStatusLocalStorage = (tituloTarefa) => {
    const tarefas = getTarefasLocalStorage()

    tarefas.map((tarefa) => tarefa.titulo === tituloTarefa ? tarefa.done = !tarefa.done : null)

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

//Atualizar tarefas Local Storage
const updateTarefaLocalStorage = (oldtituloTarefa, newTituloTarefa) => {
    const tarefas = getTarefasLocalStorage()

    tarefas.map((tarefa) => tarefa.titulo === oldtituloTarefa ? (tarefa.titulo = newTituloTarefa) : null)

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

printTarefas();


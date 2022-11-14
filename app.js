
/**ELEMENTS */
const form = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo")
const todoList = document.querySelector(".list-group")
const firstCardbody = document.querySelectorAll(".card-body")[0]
const secondCardbody = document.querySelectorAll(".card-body")[1]
const filter = document.querySelector("#filter")
const clearButton = document.querySelector("#clear-todos")

addEventListeners()


/**EVENTS */
function addEventListeners() {
    form.addEventListener("submit", addTodo)
    document.addEventListener("DOMContentLoaded", loadAllTodosToUl)
    secondCardbody.addEventListener("click", deleteTodo)
    filter.addEventListener("keyup", filterTodos)
    clearButton.addEventListener("click", clearAllTodos)
}

/** FUNCTİONS */
function addTodo(event) { // event parametresini buraya js gönderiyor ve kullandığımız eventin özelliklerini bu event sayesinde kullanabiliyorduk

    const newTodo = todoInput.value.trim()

    if (newTodo === "") {
        showAlert("danger", "lütfen bir todo giriniz")
    }
    else {
        addTodoToUl(newTodo)
        showAlert("success", "ekleme işlemi tamamlandı")
        addTodoToStorage(newTodo)
    }
    event.preventDefault()
}



function addTodoToUl(newTodo) {

    const listItem = document.createElement("li")
    const link = document.createElement("a")

    listItem.className = "list-group-item d-flex justify-content-between"
    listItem.appendChild(document.createTextNode(newTodo))

    link.className = "delete-item"
    link.href = "#"
    link.innerHTML = "<i class = 'fa fa-remove'></i>"

    listItem.appendChild(link)
    todoList.appendChild(listItem)
    todoInput.value = ""
}

function showAlert(type, message) {

    const alert = document.createElement("div")
    alert.className = `alert alert-${type}`
    alert.textContent = message
    firstCardbody.appendChild(alert)

    setTimeout(function () {
        alert.remove()
    }, 1000)
}

function getTodosFromStorage() {
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos
}

function addTodoToStorage(newTodo) {

    let todos = getTodosFromStorage()

    todos.push(newTodo)

    localStorage.setItem("todos", JSON.stringify(todos))

}

function loadAllTodosToUl() {
    let todos = getTodosFromStoraged()

    todos.forEach(function (todo) {
        addTodoToUl(todo)
    })
}

//event capturing kullanıldı
function deleteTodo(event) {

    if (event.target.className === "fa fa-remove") {
        event.target.parentElement.parentElement.remove()
        deleteTodoFromStorage(event.target.parentElement.parentElement.textContent)
        showAlert("primary", "silme işlemi başarılı")
    }
}

function deleteTodoFromStorage(deleteTodo) {

    let todos = getTodosFromStoraged()

    todos.forEach(function (todo, index) {
        if (todo === deleteTodo)

            todos.splice(index, 1) // array den değer silme (önce index sonra ne kadar array silinecekse sayısı, index ten itibaren 1 tane sil)
    })
    localStorage.setItem("todos", JSON.stringify(todos))
}

/*filter id li inputa bir todo yazdığımızda sadece arattığımı todo kalsın ve filtremize girmeyen listİtem lar görünmesin istiyoruz. Bu sebeple listİtemların tek tek display özelliklerini değiştirmemiz gerekiyor. yazdığımız karakterler listItem içinde varsa display block olacak olmayanlar none olacaklar ve küçük harf büyük har duyarlılığı olmasın diye hepsini küçük harfe çevirmeye çalışacağız*/

function filterTodos(event) {

    //bu fonksiyon çalıştığında bir todo arayın kısmına a yazarsak içinde a olan tüm li ler görünecek olmayanlar görünmeyecek. eğer tam karakter girersen sadece o li kalacak

    const filterValue = event.target.value.toLowerCase() //filter inputuna yazdığımız her şey küçük harfe çevrilerek filterValue değişkenine atanacak
    const listItems = document.querySelectorAll(".list-group-item") // bütün li leri All ile seçtik

    listItems.forEach(function (listItem) { // li elementlerini seçtikten sonra bunların üzerinde tek tek gezinmemiz gerekiyor bunun için forEach kullandık. listItem parametresi her bir li elementimize eşit olacak 

        const text = listItem.textContent.toLowerCase() // sorgu yaparken büyük küçük harf duyarlılığına takılmamak için listItem parametresi içindeki li değerlerinin textlerini küçük harfe çevirerek listItem içindeki textleri aldık

        //indexof metod içine verdiğimiz değerin index numarasını döndürüyordu ve eğer değer o dizi içinde yok ise -1 sonucu veriyordu. 
        if (text.indexOf(filterValue) === -1) {
            //textin içinde filterValue değeri bulunmuyorsa üzerinde gezindiğimiz listItem değerinin display özelliğini none yaptık
            listItem.setAttribute("style", "display : none !important") //import kullamamızın sebebi bootstraptaki d-flex komutunun içinde block bir tanım olmasıdır biz import ederek bunu ezdik yoksa li ler görünmez olmayacaktı.
        }

        else { //text değişkeni içinde listItem değeri varsa onun display özelliği block olsun yani görünsün 
            listItem.setAttribute("style", "display:block")
        }
    })

}

function clearAllTodos() {
    if (confirm("tümünü silmek istediğinize emin misiniz ?")) {
        // todoList.innerHTML = "" bu yöntem büyük projelerde yavaş kalıyor.

        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild)
        }

        localStorage.removeItem("todos")
    }
}
# TODOLİST PROJESİ

 ### Eğitim Notları

###### Kaynak: https://www.udemy.com/course/komple-sifirdan-web-gelistirme-kursu/

1-) Önce js ile etkileyeceğimiz html elementlerini seçtik

`const form = document.querySelector("#todo-form")` 
- Bu form elementini seçmemizin amacı, form submit olduğunda içindeki input bilgisini almak istememiz.

`const todoInput = document.querySelector("#todo")`
- bu input elementini içindeki string bilgisini alabilmek için seçtik


`const todolist = document.querySelector(".list-group")`
- bu ul elementini seçmemizin sebebi. aldığımız input bilgisini tekrardan bu element içine list item yani li olarak gönderebilmek 

`const firstCardBody = document.querySelectorAll(".card-body")[0]` 
- işlem durumuna göre card body altında bir alert yazısı çıkarabilmek için seçtik

`const lasttCardBody = document.querySelectorAll(".card-body")[1]`

`const filter = document.querySelector("#filter")`

`const cleatButton = document.querySelector("#clear-todos")`


`eventlisteners()`    
- sayfa ilk yüklendiğinde tüm elementlere eventler atansın diye fonksiyonu burada çalıştırdık


- Aşşağıdaki foknsiyon içinde tüm elementlerin event ekleme işlemi yapılacak.
```function eventlisteners(){  

    form.addEventListener("submit", addTodo)  form a submit eventi ekledik ve bu oluştuğunda addTodo fonksiyonu çalışsın dedik
    
     document.addEventListener("DOMContentLoaded", loadAllTodosUL) 4. videoda kurguladık
}```

function addTodo(e){   // bu fonksiyonun amacı form submit işlemi olduğunda içindeki string değerleri newTodo değişkenine atamak


    const newTodo = todoInput.value.trim()  // trim methodu inputa yazılan düzensiz boşlukları düzenler


  

        addTodoToUl(newTodo)   
    

    e.preventDefault()   // submit olduğunda sayfanın yenilenmemesini sağladık.

}

function addTodoToUl(newTodo){  //newTodo içine aldığımız input bilgilerini yani strgin değerleri li olarak ul içine ekleme işlemini yapacak fonksiyon. Bunun için önce li elementini oluşturmamız gerekiyor

   /*   <!-- <li class="list-group-item d-flex justify-content-between">
        Todo 1
        <a href = "#" class ="delete-item">
            <i class = "fa fa-remove"></i>
        </a> </li>--> */  elementini oluşturmak için önce li yi sonra li içindeki a elementini ayrı ayrı oluşturup linin içine a elementini eklememiz gerekiyor.

//önce a ve li elementlerini oluşturduk ve sonra bunların özelliklerini yukarıdaki yorum satırına göre verdik verdik 

    const listItem = document.createElement("li")

      const link = document.createElement("a")  

    link.href ="#"
    link.className="delete-Item"
    link.innerHTML="<i class = 'fa fa-remove'></i>"  // innerHTML ile direk bu şekilde html eleenti eklenebilir.

    listItem.className ="list-group-item d-flex justify-content-between" // oluşturduğumuz li ye class verdik

    listItem.appendChild(document.createTextNode(newTodo))  text node ler append child olarak ekleniyordu bu sebeple newTodo içindeki stringi bu şekilde li oluşturduğumuz li ye ekledik. 

    listItem.appendChild(link)      daha sonra a elementini li elementine ekledik
    

    todolist.appendChild(listItem) sonra da  da ul içine hazır hale gelen li yi ekledik.

    todoInput.value = "" // en son olarak input kutusu içini boşalttık

    }


--------------------------------------------------------------------------------------------------------------------
<hr>

todo ekleyin butonuna bastığımızda boş bir todo ekliyor biz bunu istemiyoruz. bunun yerine bir uyarı yazısı çıkartalım ve boş şekilde ekleme yapmamasını sağlayalım dedik


function addTodo(e){   


    const newTodo = todoInput.value.trim()  

    if (newTodo === "")   // inputun içi boşsa yani newTodo değişkeninde bir değer yoksa
    {
           /*  <div class="alert alert-danger" role="alert">
           A simple danger alert—check it out!
          </div>*/

      showAlert("danger" , "lütfen bir todo giriniz...")    //showAlert fonksiyonu çalışsın dedik ve değerlerini girdik
    }
    else  // newTodo boş değilse ekleme işini yapan addTodoToUl fonksiyonu ve showAlert fonksiyonu çalışsın dedik. 2. fonskiyonun parametre dğelrinin değiştirdik
    {
        addTodoToUl(newTodo)

        addTodosFromStoraged(newTodo) bu sonksiyonu aşağıdaki bölmde yazıp buraya ekledik

        showAlert("success" ,"başarıyla eklendi")
    }

    e.preventDefault()

}

    function showAlert(type, message){    // uyarı çıkarttığımız fonıksiyonu burada oluşturduk

        const alert = document.createElement("div")   önce alert değşikenini oluşturuğ içine bir div ekledik

        alert.className = `alert alert-${type}` sonra alerte bir class verdik

        alert.textContent = message alert değişkenini texti ni message parametresi yaptık, değerleri yukarda vermiştik

        firstCardBody.appendChild(alert) alert değişkenini cardbody e ekledik.

        setTimeout(function(){  alert yazısının 1 sn boyunca gösterilmesini ayarladık.  SETTİME OUT metodu.-
            alert.remove()
        },1000)

    }

  
--------------------------------------------------------------
<hr>

bu bölümde todoları yani newTodo değerlerini local storageye ekleyeceğiz
    

    local storage de bir todos keyi varsa bu değeri alacağız ve bize gönderilen todo ya ekleyip tekrardan local stogareye göndermeye çalışacağız. Yok ise önce todos değişkenini oluşturacağız.
    
    function getTodosFromStorage(){      
        let todos                                       todos değişkeni oluşturuldu

        if(localStorage.getItem("todos") === null){   "todos" keyi var mı kontrol yapıldı
            todos = []                                  yoksa boş şekilde bir todos array i başlattık
        }
        else{                         todos değeri varsa bunu local storageden almamız gerekiyor
        todos = JSON.parse(localStorage.getItem("todos"))       local storageye string olarak yazıldığı için arra ye çavirerek aldık
        }
        return todos        todos değişkenini dışarı döndürdik
    }

    function addTodoToStorage(newTodo){

        let todos = getTodosFromStorage()  todos u yukarıdaki fonksiyondan aldık

        todos.push(newTodo)     bbuna bize gönderilen stringi ekledik 

        localStorage.setItem("todos",JSON.stringify(todos))     artık local storagedeki değeri güncellememiz gerekiyor ve bu şekilde arrayleri stringe çevirerek güncelledik
        

    }

 
-----------------------------------------------------------------------------------------------------------------------------------
    <hr>

    sayfa yüklendiğinde todo ları local storageden alacağız ve bunları bir todo arayın kısmına ekleyeceğiz

      document.addEventListener("DOMContentLoaded", loadAllTodosUL) DOMContentLoaded eventi  döküman yüklendiğine direk oluşan bir eventti bu element yüklendiğinde çalışacak fonksiyon  loadAllTodosUL sonksiyonudur.


      
function loadAllTodosToUI(){              sayfa yenilendiğinde li ler tekrar ul nin altına gelecek
    let todos = getTodosFromStorage()   todos içine local storageden çekilecekler
    todos.forEach(function(todo){       forEach ile her key dönülecek  ve addtodo fonksiyonunda her döngüde diğer key yer alıp eklenecek
        addTodoToUl(todo)
    }
    )
}
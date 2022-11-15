function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

var activeItem = null
var list_snapshot = []

buildList()

// LIST
function buildList(){
    var wrapper = document.getElementById('list-wrapper')
    // wrapper.innerHtml = ''
    var url = 'http://127.0.0.1:8000/api/hollow/'

    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        // console.log('Data:', data)

        var list = data
        for (var i in list){
            try{
                document.getElementById(`data-row-${i}`).remove()
            }catch(err){

            }

            var title = `<p><span class="nut"> ${list[i].title} </span></p>`
            if (list[i].completed === true){
                title = `<p><s class="nut">${list[i].title}</s></p>`
            }

            // div in row!   - btn desig
            var item = `
                <div id="data-row-${i}" class="task-wrapper flex-wrapper">    
                    <div style="flex:7">
                        ${title}
                    </div>
                    <div style="flex:1">
                        <button class="btn btn-sm btn-outline-info edit">Edit</button>
                    </div>
                    <div style="flex:1">
                        <button class="btn btn-sm btn-outline-dark delete"></button>
                    </div>
                    <div>
                    <button type="button" class="btn btn-primary btn-floating mx-1">
                        <i class="fab fa-facebook-f"></i>
                    </button>
                    </div>
                </div>
            `
            // add inside list-wrapper
            wrapper.innerHTML += item
        }

        // before more than now
        if (list_snapshot.length > list.length){
            for (var i = list.length; i < list_snapshot.length; i++){
                document.getElementById(`data-row-${i}`).remove()
            }
        }

        list_snapshot = list

        for (var i in list){
            var editBtn = document.getElementsByClassName('edit')[i]
            editBtn.addEventListener('click', (function(item){
                return function(){
                    editItem(item)
                }
            })(list[i]))

            var deleteBtn = document.getElementsByClassName('delete')[i]
            deleteBtn.addEventListener('click', (function(item){
                return function(){
                    deleteItem(item)
                }
            })(list[i]))

            var nutitle = document.getElementsByClassName('nut')[i]
            nutitle.addEventListener('click', (function(item){
                return function(){
                    crack(item)
                }
            })(list[i]))
        }
    })
}


var form = document.getElementById('form-wrapper')
form.addEventListener('submit', function(e){
    e.preventDefault()
    console.log('Form submitted')

    var url = 'http://127.0.0.1:8000/api/nut/create/'
    if (activeItem != null){
        console.log(`${activeItem.id}`)
        var url = `http://127.0.0.1:8000/api/nut/update/${activeItem.id}`
        activeItem = null
    }

     // add Item!
    var title = document.getElementById('title').value
    fetch(url, {
        method: 'POST',
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        body: JSON.stringify({'title':title})
    }
    ).then(function(response){
        buildList()
        document.getElementById('form').reset()
    })
})



// icon or button
function editItem(item){
    console.log('Item clicked:', item)
    activeItem = item
    document.getElementById('title').value = activeItem.title    // seen in Form
}


// listen
function deleteItem(item){
    console.log('Delete clicked:', item)
    fetch(`http://127.0.0.1:8000/api/nut/delete/${item.id}`, {
        method:'DELETE',
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
        }
    }).then((response) => {
        buildList()
    })
}


// onclick   / tick
function crack(item){
    console.log(`Nut "${item.title}" is (un)cracked!`)

    item.completed = !item.completed
    console.log(`${item.completed}`)

    fetch(`http://127.0.0.1:8000/api/nut/update/${item.id}`, {
        method: 'POST',
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        body: JSON.stringify({'title': item.title, 'completed':item.completed})
    }).then((response) => {
        buildList()
    })
}

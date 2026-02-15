function openfeatures() {
    var allElems = document.querySelectorAll('.elem')
    var fullElemPage = document.querySelectorAll('.fullElem')
    var fullElemPageBackbtn = document.querySelectorAll('.fullElem .back')
    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            fullElemPage[elem.id].style.display = 'block'
        })
    })
    fullElemPageBackbtn.forEach(function (back) {
        back.addEventListener('click', function () {
            fullElemPage[back.id].style.display = 'none'
        })

    })
}
// openfeatures()

function todolist() {
    let form = document.querySelector('.addtask form')
    let taskInput = document.querySelector('.addtask #task-input')
    let taskDetailsInput = document.querySelector('.addtask textarea')
    let taskcheckbox = document.querySelector('.addtask form input[type="checkbox"]')

    var currentTask = []

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    } else {
        console.log('Task list is empty');

    }


    function renderTask() {

        var alltask = document.querySelector('.alltask');

        var sum = ''

        currentTask.forEach(function (elem, idx) {
            sum = sum + ` <div class="task">
                        <h5>${elem.task} <span class= ${elem.imp}>imp </span> </h5>
                        <button id= ${idx}>Mark as Completed </button>
                        
                    </div>`

        })

        alltask.innerHTML = sum
        localStorage.setItem('currentTask', JSON.stringify(currentTask))

       document.querySelectorAll('.task button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1)

                renderTask()
              

            })
        })

    }

    renderTask()



    form.addEventListener('submit', function (e) {
        e.preventDefault()

        //  console.log(taskInput.value);
        //  console.log(taskDetailsInput.value);
        //  console.log(taskcheckbox.checked);


        currentTask.push({ task: taskInput.value, details: taskDetailsInput.value, imp: taskcheckbox.checked })

        renderTask()

        taskcheckbox.checked = false 
        taskInput.value = ''
        taskDetailsInput.value = ''



    })


}

// todolist()

